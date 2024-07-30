import openai
import json
import os
from dotenv import load_dotenv, find_dotenv

standard_performance_test = {
    "ticks_per_beat": 384,
    "total_time": 8.26953125,
    "tempo": 500000,
    "time_signature": {
        "numerator": 4,
        "denominator": 4
    },
    "performance_info": [
        {"note": 60, "velocity_on": 47, "start_time": 1451, "duration": 188},
        {"note": 60, "velocity_on": 55, "start_time": 1786, "duration": 231},
        {"note": 67, "velocity_on": 65, "start_time": 2111, "duration": 212},
        {"note": 67, "velocity_on": 48, "start_time": 2431, "duration": 196},
        {"note": 69, "velocity_on": 69, "start_time": 2768, "duration": 183},
        {"note": 69, "velocity_on": 66, "start_time": 3077, "duration": 186},
        {"note": 67, "velocity_on": 66, "start_time": 3413, "duration": 332},
        {"note": 65, "velocity_on": 57, "start_time": 4082, "duration": 181},
        {"note": 65, "velocity_on": 47, "start_time": 4382, "duration": 210},
        {"note": 64, "velocity_on": 57, "start_time": 4740, "duration": 141},
        {"note": 64, "velocity_on": 56, "start_time": 5028, "duration": 200},
        {"note": 62, "velocity_on": 53, "start_time": 5385, "duration": 152},
        {"note": 62, "velocity_on": 43, "start_time": 5672, "duration": 168},
        {"note": 60, "velocity_on": 58, "start_time": 6027, "duration": 323}
    ]
}
user_performance_test = {
    "ticks_per_beat": 384,
    "total_time": 8.440104166666668,
    "tempo": 500000,
    "time_signature": {
        "numerator": 4,
        "denominator": 4
    },
    "performance_info": [
        {"note": 60, "velocity_on": 50, "start_time": 808, "duration": 155},
        {"note": 60, "velocity_on": 52, "start_time": 1132, "duration": 160},
        {"note": 67, "velocity_on": 63, "start_time": 1472, "duration": 176},
        {"note": 64, "velocity_on": 57, "start_time": 1809, "duration": 213},
        {"note": 67, "velocity_on": 60, "start_time": 1815, "duration": 209},
        {"note": 69, "velocity_on": 70, "start_time": 2385, "duration": 124},
        {"note": 69, "velocity_on": 72, "start_time": 2733, "duration": 160},
        {"note": 67, "velocity_on": 64, "start_time": 3084, "duration": 387},
        {"note": 65, "velocity_on": 55, "start_time": 3975, "duration": 190},
        {"note": 66, "velocity_on": 61, "start_time": 4333, "duration": 180},
        {"note": 64, "velocity_on": 56, "start_time": 4746, "duration": 144},
        {"note": 64, "velocity_on": 58, "start_time": 5104, "duration": 177},
        {"note": 62, "velocity_on": 53, "start_time": 5745, "duration": 133},
        {"note": 60, "velocity_on": 55, "start_time": 6079, "duration": 401}
    ]
}
diff_test = {
    "adds": [
        [
            {
                "note": 64,
                "velocity_on": 57,
                "start_time": 1809,
                "duration": 213
            }
        ]
    ],
    "deletes": [
        [
            {
                "note": 62,
                "velocity_on": 43,
                "start_time": 5672,
                "duration": 168
            }
        ]
    ],
    "changes": [
        [
            [
                {
                    "note": 65,
                    "velocity_on": 47,
                    "start_time": 4382,
                    "duration": 210
                }
            ],
            [
                {
                    "note": 66,
                    "velocity_on": 61,
                    "start_time": 4333,
                    "duration": 180
                }
            ]
        ]
    ]
}


openai.api_key = 'sk-proj-7Ar4LH2nb8SSHmwRx2v1T3BlbkFJT59kL7tiVL1zLKYLSK7G'


# openai.api_key  = 'API_KEY'


def get_completion(prompt, model):

    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0,
    )
    return response.choices[0].message["content"]


def get_feedback(
        standard_performance=standard_performance_test,
        user_performance=user_performance_test,
        diff=diff_test
):
    prompt = f"""
    You are a piano tutor and you need to compare the difference between the student's playing and the standard playing and give feedback.
    
    Please compare the user performance data with the standard performance data, evaluate the accuracy of the user's performance including note accuracy, velocity accuracy, and duration accuracy, and provide a Detailed feedback.
    The error data includes three types: extra notes, missing notes, and wrong notes.
    "adds" records the specific data of the extra notes. "deletes" records the specific data of the missing notes. "changes" records the specific data of the wrong notes, where the first note is the correct note and the second note is the wrong note played by the user.
    If there are errors such as wrong notes, missing notes, or extra notes, locate the errors at the start_time.
    Note accuracy calculation method: If the standard performance data has 20 notes and the error information records a total of 3 errors including extra notes, missing notes, and wrong notes, the correct notes are 20 - 3 = 17, and the note accuracy is 17/20 = 85%.
    The output format should be as follows. The data in the sample output is just a reference, You need to calculate the actual numbers
    {{
        "Note accuracy": "xx%",
        "Velocity accuracy": "moderate",
        "Duration accuracy": "outstanding",
        "Comment": "generated comment",
        "Errors": [
            {{
                "Error type": "wrong note",
                "Details": {{
                    "wrong note": xx, 
                    "correct note": xx, 
                    "start_time": xx
                }}                
            }},
            {{
                "Error type": "missing note", 
                "Details": {{
                    "missing note": xx, 
                    "start_time": xx
                }}                
            }},
            {{
                "Error type": "extra note",
                "Details": {{
                    "extra note": xx, 
                    "start_time": xx
                }}                
            }}
        ],
        "Detailed_Feedback":"generated detailed feedback",
        "Errors":"generated errors",
        "Recommendations":"generated recommendations"
    }}
    
    Note You just need to generate the content in the above format
    Here is the data
    Standard performance data:
    {json.dumps(standard_performance, ensure_ascii=False)}

    User performance data:
    {json.dumps(user_performance, ensure_ascii=False)}

    Error data:
    {json.dumps(diff, ensure_ascii=False)}
    """
    response = get_completion(
        prompt=prompt,
        model="gpt-4o"
    )
    return response

if __name__ == "__main__":
    get_feedback(
        standard_performance=standard_performance_test,
        user_performance=user_performance_test,
        diff=diff_test
    )
