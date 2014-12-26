# -*- coding: utf-8 -*-

from nlang.corpus.reader.chasen import *
from nlang.base.data.trie import *
from nlang.corpus.analyzer.connectivity_analyzer import ConnectivityAnalyzer
from nlang.tool.cost_calculator import calculate_cost
import re, pprint
import sys
import glob
import codecs
import os
import datetime
import threading

if len(sys.argv) < 3:
	print('usage make_connectability_table.py baseDir fileNamePattern outFileName')
	quit()

baseDir = sys.argv[1]
pattern = sys.argv[2]
out_file = 'out'
if len(sys.argv) > 3:
	out_file = sys.argv[3]
out_file += '.conn'


def analyze_func(dir_path, analyzer):
	file_list = glob.glob(os.path.expanduser(dir_path) + '/' + pattern)
	for file in file_list:
		print('analyzing ' + file)
		r = ChasenCorpusReader(file, '', 'utf-8')
		analyzer.analyze(r.tagged_words())

start = datetime.datetime.now()

analyzer_list = []
thread_list = []
for dir_path, sub_dirs, file_names in os.walk(baseDir):
	analyzer = ConnectivityAnalyzer()
	thread = threading.Thread(target=analyze_func, args=(dir_path, analyzer))
	analyzer_list.append(analyzer)
	thread_list.append(thread)
	thread.start()

for thread in thread_list:
	thread.join()

print('writing connectivity table...')

with open(out_file, 'wb') as f:
	for analyzer in analyzer_list:
		for pos, connects in analyzer.connect_table.items():
			row = pos
			for i, val in enumerate(connects):
				row += '\t' + val + ':' + str(calculate_cost(analyzer.probability(pos, val)))
			row += '\n'
			f.write(row.encode('utf-8'))

time = datetime.datetime.now() - start
print('completed! time : ' + str(time.seconds) + ' sec')

