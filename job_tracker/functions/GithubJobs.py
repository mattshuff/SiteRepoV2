""" Github jobs api is pretty slow (from 0.7s to 5s) so running this script
every ~3 hours and caching results in a json file """
from operator import itemgetter
import json
import requests
import json
import time
import logging
logging.basicConfig(level=logging.INFO)

if __name__ == "__main__":
    response = requests.get("https://jobs.github.com/positions.json?&location=uk")
    data = response.json()

    # sort list by newest created
    sorted_by_date = sorted(data, key=itemgetter('created_at'), reverse=False)

    final_list = []
    counter = 0

    """ 
    Loop over each entry in the sorted list, doing some cleaning up
        Scanning for weird / incorrect data (url instead of name)
        Changing ID to be 0 indexed
    """

    for Entry in sorted_by_date:
        #if URL, do nothing
        if "://" in Entry['company']:
            logging.info(f"Skipping {Entry['company']}")
        else:
            Entry['id'] = counter
            counter += 1
            final_list.append(Entry)

    print(final_list)
    # Write response to file
    with open('cache.json', 'w', encoding='utf-8') as f:
        json.dump(final_list, f, ensure_ascii=False, indent=4)
        
    """
    start = time.time()
    end = time.time()
    print(end - start)
    """
