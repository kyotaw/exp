# -*- coding: utf-8 -*-

from nlang.corpus.reader.chasen import *
from nlang.base.data.trie import *
from nlang.corpus.analyzer.connectivity import *
import re, pprint
import sys

if len(sys.argv) < 3:
	quit()

baseDir = sys.argv[1]
pattern = sys.argv[2]
out_file = 'out'
if len(sys.argv) > 3:
	out_file = sys.argv[3]
out_file += '.vocab'

#語彙を保存

trie = Trie()
for dirPath, subDirs, fileNames in os.walk(baseDir):
	file_list = glob.glob(os.path.expanduser(dirPath) + '/' + pattern)
	for file in file_list:
		r = ChasenCorpusReader(file, '', 'utf-8')
		tagged = r.tagged_words()
		for word in tagged:
			if word[1]:
				trie.insert(word[1], word)

voc = trie.dump()
with open(out_file, 'wb') as f:
	for v in voc:
		line = u''
		for t in v:
			if line:
				line = line + u'\t'
			line = line + t

		line = line + u'\n'
		f.write(line.encode('utf-8'))


