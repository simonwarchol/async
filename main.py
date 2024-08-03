from flask import Flask, send_from_directory, request, send_file, jsonify
from sympy import primerange
from math import gcd
import random
import csv
import io
import numpy as np
from io import StringIO, BytesIO
import pandas as pd
from flask_cors import CORS


app = Flask(__name__, static_folder='hgsu-frontend/dist')
CORS(app)  # Enable CORS for all routes


# Function to generate large prime numbers and calculate n, e, and c
def generate_primes_and_calculate():
    primes = list(primerange(100000, 999999))  # Generate 6-digit prime numbers
    p, q = random.sample(primes, 2)  # Pick two primes
    e = 3
    # Step 1: Calculate n (LCM of p-1 and q-1)
    n = np.lcm(p - 1, q - 1)
    c = random.randint(n, 2 * n)
    return p, q, c


# Function to generate voter IDs
def generate_voter_ids(union_ids, n, e, c):
    voter_ids = [(uid**e + c) % n for uid in union_ids]
    return voter_ids


@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

@app.route('/', methods=['GET'])
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/generate_primes", methods=["GET"])
def generate_primes():
    p, q, c = generate_primes_and_calculate()
    return jsonify({"p": p, "q": q, "c": c})



@app.route("/test")
def test():
    return {"message": "Hello, World!"}

def generate_id(uid, c, n):
    e = 3
    return (pow(int(uid), int(e)) + int(c)) % int(n)


def generate_voter_ids(p, q, c, df):
    e = 3
    n = np.lcm(p - 1, q - 1)
    print("Simon N", n, p, q, c)
    df["Voter ID"] = df["Union ID "].apply(
        lambda uid: (pow(int(uid), int(e)) + int(c)) % int(n)
    )
    return df


@app.route("/upload_csv", methods=["POST"])
def upload_csv():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file:
        # Load the DataFrame and only keep columns that exist
        expected_columns = [
            "Name : First",
            "Name : Last",
            "Voter ID",
            "Preferred Email",
            "Harvard Email",
            "Personal Email",
            "Directory Email",
        ]
        voter_emails = pd.read_csv(file)
        # Generate Voter IDs
        p = int(request.form.get("p"))
        q = int(request.form.get("q"))
        c = int(request.form.get("c"))

        voter_emails = generate_voter_ids(p, q, c, voter_emails)

        print(voter_emails.columns)

        available_columns = [
            col for col in expected_columns if col in voter_emails.columns
        ]
        voter_emails = voter_emails[available_columns]

        # Format and save voter lists
        voter_emails_formatted = (
            pd.melt(
                voter_emails,
                id_vars=["Name : First", "Name : Last", "Voter ID"],
                var_name="email_type",
                value_name="Email",
            )
            .dropna(subset=["Email"])
            .rename(
                columns={
                    "Name : First": "First Name",
                    "Name : Last": "Last Name",
                    "Voter ID": "VoterID",
                }
            )
        )

        output = BytesIO()
        voter_emails_formatted[["First Name", "Last Name", "VoterID", "Email"]].to_csv(
            output, index=False
        )
        output.seek(0)

        

        return send_file(
            output,
            mimetype="text/csv",
            download_name="processed_voter_emails.csv",
            as_attachment=True,
        )


if __name__ == "__main__":
    app.run(debug=True)
