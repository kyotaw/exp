# -*- coding: utf-8 -*- 

from nlang.base.util import pp
from nlang.parser.tagger import Tagger

t = Tagger()
r = t.parse(u'彼の車')

print pp(r)
