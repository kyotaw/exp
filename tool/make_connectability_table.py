# -*- coding: utf-8 -*-

from nlang.corpus.reader.chasen import *
from nlang.base.data.trie import *
from nlang.corpus.analyzer.connectivity import *
import re, pprint
import sys
import glob
import codecs
import os

if len(sys.argv) < 3:
	quit()

baseDir = sys.argv[1]
pattern = sys.argv[2]
out_file = 'out'
if len(sys.argv) > 3:
	out_file = sys.argv[3]
out_file += '.conn'

analyzer = ConnectivityAnalyzer()
for dirPath, subDirs, fileNames in os.walk(baseDir):
	file_list = glob.glob(os.path.expanduser(dirPath) + '/' + pattern)
	for file in file_list:
		r = ChasenCorpusReader(file, '', 'utf-8')
		analyzer.analyze(r.tagged_words())
	
with open(out_file, 'wb') as f:
	for pos, connects in analyzer.connect_table.items():
		row = pos
		for i, val in enumerate(connects):
				row += '\t' + val + ':' + str(analyzer.freq_table[pos][i])
		row += u'\n'
		f.write(row.encode('utf-8'))
