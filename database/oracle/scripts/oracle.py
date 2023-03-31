import cx_Oracle

class OracleDBProcessor:
    def __init__(self):
        try:
            self.con = cx_Oracle.connect('admin/ra123456@localhost:1521/orcl')
            self.cursor = self.con.cursor()
        except cx_Oracle.DatabaseError as e:
            print("Oracle Error", e)
        else:
            print("Oracle connect successful")
            self.con.close()
    
if __name__ == '__main__':
    oracle = OracleDBProcessor()
        



    