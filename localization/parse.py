import sys
def convertBlockToTuple(snip):
    if(len(snip) <7):
        return []
    elementTuple = (snip[5],snip[7])
    lineToTuple =[]
    for i in range(8,len(snip)):
        if(snip[i] == "LineTo"):
            lineToTuple.append((snip[i+3],snip[i+5]))
    return (elementTuple,lineToTuple)

data = ""
if(len(sys.argv) < 2):
    print ("Enter a file name")
    raise SystemExit
filename = sys.argv[1]
print filename
with open(filename,'r') as myfile:
    data = myfile.read().replace('\n','')

arr = data.split(" ")
elements = []
arrTemp =[]
getElem=False
for word in arr:
    if(word == "elements:"):
        getElem = True
    if(word == "]"):
        getElem=False
        elements.append(arrTemp)
        arrTemp=[]
    if(getElem):
        arrTemp.append(word)

print len(elements)
for i in range(0,len(elements)):
    elements[i] = filter(lambda a : a != "",elements[i])

elemWOBlank = filter(lambda a : a != [], elements)

spoodaraj=[]
for elem in elemWOBlank:
    spoodaraj.append(convertBlockToTuple(elem))

toret=[]
for spooda in spoodaraj:
    moveto = spooda[0]
    lineto= spooda[1]

    for line in lineto:
        toret.append((moveto[0],moveto[1],line[0],line[1]))

for i in range(0,len(toret)):
    toret[i] = map(lambda a : float(a),toret[i])
newfilename = filename[:-2] + "map.m"
f = open(newfilename , 'w')
for ret in toret:
    s = str(ret[0])+","+str(ret[1])+","+str(ret[2])+","+str(ret[3])+"\n"
    f.write(s)

