import numpy as np
import os
import json
import time

def load_manifest_data(filename):
    with open(filename, 'r') as json_file:
        data = json.load(json_file)
        return data