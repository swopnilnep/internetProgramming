from operator import itemgetter
L=[[0, 1, 'f'], [4, 2, 't'], [9, 4, 'afsd']]
print(sorted(L, key=itemgetter(0)))



