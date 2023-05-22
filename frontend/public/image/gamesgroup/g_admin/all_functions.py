from sqlalchemy import create_engine
import petl as etl
import pandas as pd
from datetime import timedelta
engine_1 = create_engine('postgresql://' + 'pamella' + ':' + \
		 		'W6r&5F5a$Y' + '@' + 'egg-redshift1.cwtmse5p1rcl.eu-west-1.redshift.amazonaws.com' + ':' + '5439' + '/' + 'eggredshift')
def query_exe(query,engine,exp=''):
    """To execute query in redshift without expecting data from it.

    Args:
        query (string): To insert data into redshift.
        engine (_type_): credential sting contain password,username etc.
        exp (str, optional): if query fails execute then recurse this as query if it is not empty . Defaults to ''.
    """
    con = engine.connect()
    try:
        con.execute(query)
        con.close()
    except Exception as xcp:
        if exp!='':
            query_exe(exp,engine,'')
        print("error: " + str(xcp))

def fetch_data(query,prnt=False):
    """To Fetch data from redshift and convert it into dataframe

    Args:
        query (string): query which return records of table
        prnt (bool, optional): if True then only print query in terminal. Defaults to False.

    Returns:
        dataframe: return dataframe of fetched from redshift.
    """
    if prnt:print(query)
    tab_rs=etl.fromdb(engine_1,query)
    df=pd.DataFrame(tab_rs)
    df=rename_columns(0,df)
    return df

def date_list(start_date,end_date,reverse_date=False):
    """To genrate list of range from start date to end date

    Args:
        start_date (datetime): start date from which start checking condition.
        end_date (datetime): end date from which checking conditon upto particular date. 
        reverse_date (bool, optional): If true then it will reverse created range list. Defaults to False return list without reversing it.

    Returns:
        list: it will return list of date in range between.
    """
    lst=[]#Holds all date
    delta = timedelta(days=1)
    while start_date <= end_date:
        lst.append(start_date.strftime("%Y-%m-%d"))
        start_date += delta
    if reverse_date:lst=reversed(lst)#Function to reverse list
    return lst

def rename_columns(label_index,df):
    """Getting data from redshift using petle does not give columns name so we have to assign column names from 0 index row of dataframe.

    Args:
        label_index (int): index of dataframe to use which row we want to use as column names.
        df (DataFrame): To read dataframe and rename columns

    Returns:
        DataFrame: Which will return renamed columns and deleted row dataframe.
    """
    df=df.rename(columns={x:df.iloc[0,x] for x in df.columns})
    df=df.drop(labels=label_index,axis=0)
    return df
