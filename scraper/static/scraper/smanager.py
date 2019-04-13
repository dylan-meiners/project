import json
import time
import os
import sys

#===============================================================================

DATA_JSON_ROOT = '../../static/js/data.json'

#===============================================================================

def addwebsite(data, website, targets, action):

    for i in data['websites']:
        if i['site'] == website:
            print('tried adding website: ', website, ' but it already exists!')
            return

    data['websites'].append({
        'site': website,
        'targets': targets,
        'action': action,
    })

    with open(DATA_JSON_ROOT, 'w') as file:
        json.dump(data, file, indent=4)

    print('added website:', website, 'with targets:', targets, 'and an action:', action)

#===============================================================================

def deletewebsite(data, website):

    for i in data['websites']:
        if i['site'] == website:
            data['websites'].pop(data['websites'].index(
            {"site": website, "targets": i['targets'], "action": i['action']}
            ))

            with open(DATA_JSON_ROOT, 'w') as file:
                json.dump(data, file, indent=4)

            print('deleted website:', website)
            return

    print('lucky you!  Website:', website, 'does not even exist!')
