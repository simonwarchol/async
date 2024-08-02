### IMPORTANT READ ME: THIS CODE LOOKS FOR FILES NAMED "voteremails.csv"

import pandas as pd 
import numpy as np 
from datetime import datetime 

#get date to stamp the files: 
date = datetime.now() 
date = str(date)[:10].replace("-",".") 

voter_filename = "voters_" + date + ".csv" 

#load in lists and keep only the columns we care about 
voter_emails = pd.read_csv("voteremails.csv")[['Name : First','Name : Last','Voter ID','Preferred Email','Harvard Email','Personal Email']] 

#format and save voter lists 
voter_emails_formatted = pd.melt(voter_emails, id_vars=['Name : First','Name : Last','Voter ID'], var_name='email_type', value_name='Email').dropna(subset=['Email']).rename(columns={'Name : First':'First Name','Name : Last':'Last Name','Voter ID':'VoterID'}) 
voter_emails_formatted[['First Name','Last Name','VoterID','Email']].to_csv(voter_filename, index=False) 


