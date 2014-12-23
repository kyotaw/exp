# -*- coding: utf-8 -*-

class ConnectivityTable:
	def __init__(self, file_path):
		self.table = {}
		with open(file_path, 'r') as f:
			line = f.readline()
			while line:
				tokens = line[:-1].split('\t')
				if len(tokens) > 0:
					if tokens[0] not in self.table:
						self.table[tokens[0]] = []
					self.table[tokens[0]] += tokens[1:]
				line = f.readline()
	
	def is_connectable(self, left, right):
		return left in self.table and right in self.table[left]
