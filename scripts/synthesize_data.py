import os, json
import numpy as np
import random
import string
from scripts.configs import config
path = os.path.join('../data', config.manifest_name)
n_paper = 10
# id, authors, venue, year, title, abstract, mining_tech, vis_tech, tasks, applications
authors = ["Daniel Keim", "John Stasko", "Jeff Heer", "Klaus Muller", "Thomas Ertl", "Yingcai Wu", "Boshine Lee"]
venues = ["IEEE VAST", "IEEE INFOVIS", "IEEE TVCG", "EuroVis", "IEEE PacificVis"]
mining_techs = ["classification", "clustering", "dim reduction", "regression"]
vis_techs = ["PCP", "scatterplots", "line charts", "tree", "glyph"]
tasks = ["exploration", "cluster analysis", "information retrieval", "model understanding"]
applications = ['text analytics', 'biomedical analysis', 'multimedia analysis', 'healthcare']
m_tech_hier = {"name": "mining_techs", 'parent': 'null', "children":
                    [{"name": 'm_tech_group_1', 'parent':'mining_techs', 'children':
                        [{"name": "classification", 'parent':'m_tech_group_1', "papers": [3]},
                        {"name": "clustering", 'parent':'m_tech_group_1', "papers": [2, 5, 8, 9]}]
                      },
                     {
                     'name': 'm_tech_group_2', 'parent':'mining_techs', 'children':
                        [{"name": "dim reduction", 'parent':'m_tech_group_2', "papers": [0, 1, 4]},
                        {"name": "regression", 'parent':'m_tech_group_2', "papers": [6, 7]}]
                    }]
}
vis_tech_hier = {"name": "vis_techs", 'parent': 'null', "children":
                    [{'name': 'vis_tech_group_1', 'parent': 'vis_techs', 'children':[
                        {"name": "PCP", 'parent': 'vis_tech_group_1', "papers": [0, 3]}]
                      },
                      {'name': 'vis_tech_group_2', 'parent': 'vis_techs', 'children':[
                         {"name": "scatterplots", 'parent': 'vis_tech_group_2', "papers": [2]},
                         {"name": "line charts", 'parent': 'vis_tech_group_2', "papers": [1, 8, 9]}]
                     },
                      {'name': 'vis_tech_group_3', 'parent': 'vis_techs', 'children':[
                          {"name": "tree", 'parent': 'vis_tech_group_3', "papers": [4, 7]},
                          {"name": "glyph", 'parent': 'vis_tech_group_3', "papers": [5, 6]}]
                     }]
}
tasks_hier = {"name": "tasks", 'parent': 'null', "children":
                [{'name': 'task_group_1', 'parent': 'tasks', 'children': [
                    {"name": "exploration", 'parent': 'task_group_1', "papers": [4, 6, 7]},
                     {"name": "cluster analysis", 'parent': 'task_group_1', "papers": [3]}]
                    },
                 {'name': 'task_group_2', 'parent': 'tasks', 'children': [
                     {"name": "information retrieval", 'parent': 'task_group_2', "papers": [0, 2]},
                     {"name": "model understanding", 'parent': 'task_group_2', "papers": [1, 5, 8, 9]}]
                  }]
}
app_hier = {'name': 'apps', 'parent': 'null', 'children':
                [{'name': 'app_group_1', 'parent': 'apps', 'children': [
                    {"name": "text analytics", 'parent': 'app_group_1', "papers": [8]},
                    {"name": "biomedical analysis", 'parent': 'app_group_1', "papers": [9]}]
                  },
                 {'name':'app_group_2', 'parent': 'apps', 'children': [
                    {"name": "multimedia analysis", 'parent': 'app_group_2', "papers": [1, 2, 3, 4, 7]},
                    {"name": "healthcare", 'parent': 'app_group_2', "papers": [0, 5, 6]}]
                 }]
}
def gen_multi_level_tree():
    tree_list = [m_tech_hier, vis_tech_hier, tasks_hier, app_hier]
    return tree_list
def random_text_generator(size=15, chars=string.ascii_uppercase + string.digits + ' '):
    return ''.join(random.choice(chars) for x in range(size))
def gen_paper(n_paper):
    paper_list = {}
    for id in range(0, n_paper):
        author = []
        for i in range(0, 3):
            author.append(authors[random.randint(0, len(authors) - 1)])
        author = ' '.join(author)
        venue = venues[random.randint(0, len(venues) - 1)]
        year = random.randint(2000,2018)
        title = random_text_generator(40)
        abs = random_text_generator(200)
        mining_tech = mining_techs[random.randint(0, len(mining_techs) - 1)]
        vis_tech = vis_techs[random.randint(0, len(vis_techs) - 1)]
        task = tasks[random.randint(0, len(tasks) - 1)]
        application = applications[random.randint(0, len(applications) - 1)]
        paper_list[id] = {
            'authors': author,
            'venue': venue,
            'year': year,
            'title': title,
            'abs': abs,
            'm_tech': mining_tech,
            'v_tech': vis_tech,
            'tasks': task,
            'app': application
            }
    return paper_list
def gen_taxo(n_paper, paper_list):
    tree_list = []
    taxos = ['mining_techs', 'vis_techs', 'tasks', 'applications']
    taxo_id = ['m_tech', 'v_tech', 'tasks', 'app']
    taxo_children = [mining_techs, vis_techs, tasks, applications]
    for idx, taxo in enumerate(taxos):
        children = []
        for taxo_child in taxo_children[idx]:
            papers = []
            for id in range(0, n_paper):
                if paper_list[id][taxo_id[idx]] == taxo_child:
                    papers.append(id)
            child = {'name': taxo_child, 'papers': papers}
            children.append(child)
        tree_list.append({'name': taxo, 'children': children})
    return tree_list
if __name__ == '__main__':
    with open(path, 'w') as out_f:
        paper_list = gen_paper(n_paper)
        #tree_list = gen_taxo(n_paper, paper_list)
        tree_list = gen_multi_level_tree()
        data = {
            'tree_list': tree_list,
            'paper_list': paper_list
        }
        json.dump(data, out_f)