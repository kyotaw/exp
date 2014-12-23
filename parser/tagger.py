# -*- coding: utf-8 -*-

from nlang.base.data.conn_table import ConnectivityTable
from nlang.base.data.vocabulary import Vocabulary
from nlang.base.data.trie import Trie
from nlang.base.util import pp

class Tagger:
	def __init__(self):
		self.__conn_table = ConnectivityTable('../data/conn/master/master.conn')
		self.__vocab = Vocabulary('../data/vocab/master/master.vocab')
		self.__trie = Trie()
		for word in self.__vocab.words:
			self.__trie.insert(word['lemma'], word)

	def parse(self, sentence):
		bos_entry = {'lemma':u'BOS', 'pos':'BOS', 'length':1, 'cost':0}
		eos_entry = {'lemma':u'EOS', 'pos':'EOS', 'length':1, 'cost':0}
		bos_node = {'next':[], 'entry':bos_entry}
		node_list = {}
		node_list[0] = [bos_node]

		length = len(sentence)
		for i in range(0, length + 1):
			if i not in node_list:
				continue

			if i < length:
				entries = []
				words = self.__trie.common_prefix_search(sentence[i:])
				for word in words:
					entries.append({'lemma':word['lemma'] + word['pos'], 'pos':word['pos'], 'length':word['length'], 'const':0})
			else:
				entries = [eos_entry]

			for entry in entries:
				new_node = {'next':[], 'entry':entry}
				for node in node_list[i]:
					if self.__conn_table.is_connectable(node['entry']['pos'], new_node['entry']['pos']):
						node['next'].append(new_node)
					
						index = i + entry['length']
						if index not in node_list:
							node_list[index] = []
						if new_node not in node_list[index]:
							node_list[index].append(new_node)

		return self.__enum_nodes(bos_node)
	
	def __enum_nodes(self, node):
		stream_list = []
		lemma = node['entry']['lemma']
		if lemma == u'EOS':
			return [[lemma]]
		
		if 'next' not in node:
			print '#################################'
			print '__enum_nodes : not have next node'
			print '#################################'
			return [[lemma]]

		for	next_node in node['next']:
			for stream in self.__enum_nodes(next_node):
				stream_list.append([lemma] + stream)
		return stream_list


