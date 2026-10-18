import sqlite3


def create_something(Date,Type,Category,Description,Amount):
    connnection=sqlite3.connect("database.db")
    cursor=connnection.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS database(
            id INTEGER PRIMARY KEY,
            Date TEXT,
            Type TEXT,
            Category TEXT,
            Description TEXT,
            Amount REAL
        )
        
        """
        
    )
    
    cursor.execute(
        """
            INSERT INTO database(Date,Type,Category,Description,Amount)
            VALUES(?,?,?,?,?)
        """,(Date,Type,Category,Description,Amount)
        
    )
    
    
    connnection.commit()
    connnection.close()
    

def shape(some):
    data=[]
        
    for single in some:
        data.append(
                {
                "Id": single[0],
                "Date": single[1],
                "Type": single[2],
                "Category": single[3],
                "Description": single[4],
                "Amount": single[5]
                }
            )
    return data

    
def get_all_data():
    connection=sqlite3.connect("database.db")
    cursor=connection.cursor()
    
    cursor.execute(
        "SELECT * FROM database "
    )
    
    raw=cursor.fetchall()
    
    result=shape(raw)
    connection.close()
    return result


def preview_income():
    connection=sqlite3.connect("database.db")
    cursor=connection.cursor()
    
    cursor.execute(
        """
        SELECT * FROM database WHERE Type="Income"
        """
        
    )
    
    response=cursor.fetchall()
    result=shape(response)
    connection.close()
    return result




def preview_expense():
    connection=sqlite3.connect("database.db")
    cursor=connection.cursor()
    
    cursor.execute(
        """
        SELECT * FROM database WHERE Type="Expense"
        """
        
    )
    
    response=cursor.fetchall()
    result=shape(response)
    connection.close()
    return result


def update_database(Id,Date,Type,Category,Description,Amount):
    connection=sqlite3.connect("database.db")
    cursor=connection.cursor()
    
    cursor.execute(
        """
        UPDATE database
        SET Date=?,Type=?,Category=?,Description=?,Amount=? 
        WHERE id=?
        """,(Date,Type,Category,Description,Amount,Id,)
        
    )
    
    connection.commit()
    connection.close()
    
    
def delete_element(Id):
    connection=sqlite3.connect("database.db")
    cursor=connection.cursor()

    cursor.execute(
        """
        DELETE FROM database WHERE id=?
        """,(Id,)
        
    )
    connection.commit()
    connection.close()
    

def data_report(Month,Year):
    connection=sqlite3.connect("database.db")
    cursor=connection.cursor()
    
    cursor.execute(
        """
        SELECT * FROM database WHERE strftime("%m",Date)=? and strftime("%Y",Date)=?
        
        """,(Month,Year,)
        
    )
    
    response=cursor.fetchall()
    result=shape(response)
    connection.close()
    return result

def rpoet_mtrend(Year):
    connection=sqlite3.connect("database.db")
    cursor=connection.cursor()

    
    cursor.execute(
        """
        SELECT * FROM database WHERE strftime("%Y",Date)=?
        
        """,(Year,)
        
    )
    
    responce=cursor.fetchall()
    result=shape(responce)
    connection.close()
    return result