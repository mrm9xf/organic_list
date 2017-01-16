import os
import sys
import pyodbc

QUERIES_DIR = '/home/mrm9xf/Documents/organic_list/queries/'

def build_connection():
    connection = pyodbc.connect('DSN=MYSQL')
    return connection

def read_query(query_name, params={}):
    if len(params):
        sql = open(os.path.join(QUERIES_DIR, query_name + '.sql'), 'r').read().format(**params)
    else:
        sql = open(os.path.join(QUERIES_DIR, query_name + '.sql'), 'r').read()

    return sql

def execute_query(sql, connection):
    results = connection.cursor().execute(sql).fetchall()
    return results


def write_query(sql, connection):
    connection.cursor().execute(sql)
    connection.commit()
