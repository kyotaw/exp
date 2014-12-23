# -*- coding: utf-8 -*-

class Vocabulary:
	def __init__(self, file_path):
		self.words = []
		with open(file_path, 'r') as f:
			line = f.readline()
			while line:
				tokens = line[:-1].split('\t')
				if len(tokens) < 3:
					continue
				word = {'lemma':tokens[0].decode('utf-8'), 'pron':tokens[1].decode('utf-8'), 'pos':tokens[2], 'length':len(tokens[0].decode('utf-8'))}
				self.words.append(word)
				line = f.readline()
