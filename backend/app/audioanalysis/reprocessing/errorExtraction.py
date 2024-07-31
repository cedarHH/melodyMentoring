import difflib
import json


def extract_key_values(dict_list, key):
    return [d[key] for d in dict_list]


def find_diffs_with_subsequences(list1, list2, key):
    values1 = extract_key_values(list1, key)
    values2 = extract_key_values(list2, key)

    matcher = difflib.SequenceMatcher(None, values1, values2)
    adds = []
    deletes = []
    changes = []

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == 'replace':
            changes.append((list1[i1:i2], list2[j1:j2]))
        elif tag == 'delete':
            deletes.append(list1[i1:i2])
        elif tag == 'insert':
            adds.append(list2[j1:j2])

    return adds, deletes, changes


def read_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data_dict = json.load(file)
    return data_dict


def write2json(data, json_file):
    json_data = json.dumps(data, indent=4, ensure_ascii=False, sort_keys=False)
    with open(json_file, 'w', encoding='utf-8') as file:
        file.write(json_data)


def diff(
        reference_performance,
        user_performance
):
    key = 'note'
    json1 = read_json(reference_performance)
    json2 = read_json(user_performance)
    list1 = json1["performance_info"]
    list2 = json2["performance_info"]
    adds, deletes, changes = find_diffs_with_subsequences(list1, list2, key)

    result = dict()
    result["adds"] = adds
    result["deletes"] = deletes
    result["changes"] = changes
    return result, json1, json2


list1 = [{'id': 1, 'value': 'a'}, {'id': 2, 'value': 'b'}, {'id': 3, 'value': 'c'}, {'id': 4, 'value': 'd'},
         {'id': 5, 'value': 'e'}, {'id': 6, 'value': 'f'}]
list2 = [{'id': 1, 'value': 'a'}, {'id': 2, 'value': 'b'}, {'id': 7, 'value': 'g'}, {'id': 8, 'value': 'h'},
         {'id': 9, 'value': 'i'}, {'id': 5, 'value': 'e'}, {'id': 6, 'value': 'f'}]


if __name__ == "__main__":
    result = diff("../data/data1_2.json", "../data/data1_4.json")
    write2json(result, "../data/data1_2_data1_4.json")