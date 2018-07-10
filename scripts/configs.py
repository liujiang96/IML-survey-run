import sys
import os
SERVER_ROOT = os.path.dirname(sys.modules[__name__].__file__)

class Config(object):
    def __init__(self):
        #raw data root
        self.log_root = os.path.join(SERVER_ROOT,".log/")

        # first-level directory
        self.data_root = os.path.join(SERVER_ROOT,"../data/")
        self.scripts_root = os.path.join(SERVER_ROOT, "../scripts/")
        self.server_data_rootc = "data"

        # second-level directory
        self.dog_dataset_name = "dog"
        self.monkey_dataset_name = "monkey"
        self.bird_dataset_name = "bird"
        self.dll_name = "dll"

        # third-level directory
        self.origin_data = "origin_data"
        self.info_data = "info/"
        self.image_data = "image"
        self.confusion_matrix_data_path = "confusion_matrix"
        self.estimated_confusion_matrix_data_path = "estimated_confusion_matrix"
        self.worker_simi_buffer_path = "worker_simi_buffer"

        # filename
        self.manifest_name = "manifest.json"
        self.static_info_name = "static_info.json"
        self.crowd_data_name = "crowd_data.json"
        self.info_manifest_name = "manifest.json"
        self.info_static_name = "static_info.json"
        self.info_dynamic_name = "dynamic_info.json"
        self.info_guided_tsne_name = "guided_tsne_info.json"
        self.info_unnorm_guided_tsne_name = "unnorm_guided_tsne_info.json"
        self.info_influence_name = "influence.json"
        self.init_model_name = "init_model.pkl"
        self.debug_model_name = "debug_model.pkl"
        self.solution_uncertainty_name = "solution_uncertainty.npy"

config = Config()