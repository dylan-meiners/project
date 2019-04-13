import json
import time
import os
import sys

import smanager as SiteManager

#===============================================================================

DATA_JSON_ROOT = '../../static/js/data.json'

#===============================================================================

def loaddata():

    with open(DATA_JSON_ROOT) as file:
        data = json.load(file)

    return data

#===============================================================================

def main(argv):

    print()
    print('Started master.py')
    print('===============================================================================')
    print()

    data = loaddata()

    if len(argv) > 0:
        if argv[0] == 'aw':
            if len(argv) >= 4:
                SiteManager.addwebsite(data, argv[1], argv[2], argv[3])

        elif argv[0] == 'dw':
            if len(argv) >= 4:
                SiteManager.deletewebsite(data, argv[1])

    print()
    print('===============================================================================')
    print()

#===============================================================================

if __name__ == '__main__':
    main(sys.argv[1:])
