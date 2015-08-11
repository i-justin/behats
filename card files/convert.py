import csv
f = open("bcards2.txt","r")
out=open("bcards2.json","w")
#print(f.read())
cards=f.read().split("|")
print (len(cards))
for card in cards:
    out.write('bcards.insert({"text":"%s"});\n' %(card))
out.close()
