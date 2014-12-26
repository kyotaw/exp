# -*- coding: utf-8 -*-

from nlang.base.data.trie import Trie

class ConnectivityAnalyzer:
	def __init__(self):
		self.connect_table = {}
		self.pos_count = {}
		self.bigram_count = Trie()
	
	def analyze(self, tagged_words):
		sentence = []
		for word in tagged_words:
			if word[2] == 'SY-PE':
				self.__analyze(sentence)
				del sentence[:]
			else:
				sentence.append(word[2])

	def probability(self, left_pos, right_pos):
		if left_pos not in self.pos_count:
			return 0
		return self.bigram_count.count(left_pos, right_pos) * 1.0 / self.pos_count[left_pos]

	def __analyze(self, sentence):
		cur_left = u'BOS'
		for right_pos in sentence:
			if cur_left not in self.connect_table:
				self.connect_table[cur_left] = []
			if right_pos not in self.connect_table[cur_left]:
				self.connect_table[cur_left].append(right_pos)
			self.bigram_count.insert(cur_left, right_pos)
		
			if cur_left in self.pos_count:
				self.pos_count[cur_left] += 1
			else:
				self.pos_count[cur_left] = 1

			cur_left = right_pos
		if cur_left not in self.connect_table:
			self.connect_table[cur_left] = []
		if 'EOS' not in self.connect_table[cur_left]:
			self.connect_table[cur_left].append('EOS')
		self.bigram_count.insert(cur_left, 'EOS')
		if cur_left in self.pos_count:
			self.pos_count[cur_left] += 1
		else:
			self.pos_count[cur_left] = 1
