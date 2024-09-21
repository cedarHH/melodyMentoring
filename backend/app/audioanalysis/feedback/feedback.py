import openai
import json
import os

openai.api_key = '****'


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
        standard_performance,
        user_performance,
        diff
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
        "ticks_per_beat": Displays relevant data in user_performance,
        "total_time": Displays relevant data in user_performance,
        "tempo": Displays relevant data in user_performance,
        "numerator": Displays relevant data in user_performance,
        "denominator": Displays relevant data in user_performance
        "Note accuracy": "xx%",
        "Velocity accuracy": "Unsatisfactory|Poor|Needs Improvement|Acceptable|Satisfactory|Excellent|Outstanding",
        "Duration accuracy": "Unsatisfactory|Poor|Needs Improvement|Acceptable|Satisfactory|Excellent|Outstanding",
        "Comment": "generated comment",
        "Detailed_Feedback":"generated detailed feedback",
        "Errors":"generated summary errors. For example: You had 1 extra note, 1 missing note, and 1 wrong note.",
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
