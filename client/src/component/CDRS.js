import React, { useState , useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateVacApp, detailsVacApp } from "../actions/vaccineAppointmentActions";

const CDRSForm = () => {
  // Initial state for form formdata
  const [formData, setFormData] = useState({});

  // CDRS Questions Data
  const questions = [
        {
          id: 1,
          text: "Depressed Mood",
          scale: 5,
          description:
            "Affect may be aroused (e.g., sad, forlorn, gloomy, anguished) or suppressed. Note nonverbal behavior (e.g., facial expression, eye contact, body posture). Child may or may not verbalize feelings of sadness.",
          options: [
            "No information",
            "Definitely not depressed - facial expression and voice animated during interview",
            "Doubtful - mild suppression of affect during interview and/or some loss of spontaneity",
            "Mild - overall some loss of spontaneity. Child looks unhappy during parts of interview. May still be able to smile when discussing nonthreatening areas",
            "Moderate - may have a moderate restriction of affect throughout most of the interview and have brief periods where looks unhappy",
            "Severe - child looks sad, withdrawn with little verbal interaction throughout interview. May look like crying",
          ],
        },
        {
          id: 2,
          text: "Weeping",
          scale: 3,
          description:
            "Information usually from parents, teachers, but occasionally from child.",
          options: [
            "No information",
            "Normal for age",
            "Suggestive statements that child cries more frequently than peers",
            "Cries frequently - more than reasonable for age or provocation",
          ],
        },
        {
          id: 3,
          text: "Self-Esteem",
          scale: 5,
          description:
            "The child’s ability to describe self is very concrete at 6 and 7, becoming more sophisticated at 9 and 10. Note affective tones around the child’s formdata. Inappropriate guilt rates 3 or 4.",
          options: [
            "No information",
            "Child describes self in mostly positive terms",
            "Doubtful evidence of lowered self-esteem",
            "Child describes self using a mixture of attributes, with both affectively positive and negative tones",
            "Child uses both affectively positive and negative terms, but preponderance of negative attributes, or if concept understood, gives minimal bland answers",
            "Child either refers to self in derogatory terms (e.g., unpleasant nicknames) or completely avoids any question dealing with self-concepts, self-image, or self-esteem",
          ],
        },
        {
          id: 4,
          text: "Morbid Ideation",
          scale: 4,
          description:
            "Assess any thoughts related to death or morbid themes expressed by the child.",
          options: [
            "No information",
            "None expressed",
            "Some morbid thoughts - all related to a recent reality event",
            "Admits to morbid thoughts on questioning, but does not dwell on them, or parents report morbid thoughts of child",
            "Death themes spontaneously discussed or elaborate and extensive morbid ideation",
          ],
        },
        {
            id: 5,
            text: "Suicide and Suicide Ideation",
            scale: 5,
            description:
              "Assess the child for thoughts or behaviors related to suicide, including ideation or attempts.",
            options: [
              "No information",
              "None",
              "Has thoughts about suicide - usually when angry",
              "Recurrent thoughts of suicide",
              "Thinks about suicide and names methods or if depressed, strongly denies thinking about suicide",
              "Suicide attempt within the last month or actively suicidal",
            ],
          },
          {
            id: 6,
            text: "Irritability",
            scale: 5,
            description:
              "Information usually from parents, nurses, etc., and direct observation. This can range from whining, 'chip on the shoulder' attitudes to temper outbursts and other direct displays of hostility and anger. Rate on frequency of irritable behavior.",
            options: [
              "No information",
              "Normal",
              "Occasional - slightly more than normal",
              "Episodic",
              "Frequent",
              "Constant",
            ],
          },
          {
            id: 7,
            text: "Schoolwork",
            scale: 5,
            description:
              "Consider current function as opposed to usual or expected function. Expected function should take into consideration the intelligence of the child and specific learning disabilities, cultural and family expectations.",
            options: [
              "No information",
              "Performing at or above the expected level",
              "Not working to capacity or recent disinterest in schoolwork with minimal interference with performance",
              "Doing poorly in most subjects or evidence of a recent major interference with performance",
              "Incapable of doing productive schoolwork at time of rating",
            ],
          },
          {
            id: 8,
            text: "Capacity to Have Fun",
            scale: 5,
            description:
              "Often reflected in hobbies and interests outside of school.",
            options: [
              "No information",
              "Child’s interests and hobbies appropriate for age, personality, and environment. No appreciable change during present illness",
              "Child has interests-hobbies outside of school, but activities mainly passive. Shows some interest but not enthusiasm",
              "Child easily bored. May frequently complain of nothing to do or expresses interest and hobbies which are realistically unavailable to the child",
              "In structured activities, may 'go through the motions' without real interest or enthusiasm",
              "Child doesn’t take initiative to involve self in any activities. Tends to passively watch others or watch TV. Takes pushing and coaxing to involve in any activities.",
            ],
          },
          {
            id: 9,
            text: "Social Withdrawal",
            scale: 5,
            description:
              "Evaluates the child's peer relationships at school and home, assessing changes in behavior, participation, and rejection of interactions.",
            options: [
              "No information",
              "Enjoys good friendships with peers at school and home or never has had adequate peer relationships",
              "Child names several friends, but relationships sound meager or has one or two friends, but not able to integrate into larger peer group",
              "Child changes from actively seeking out friendships to a passive role (i.e., waits for others to initiate a relationship). Observes rather than participates in groups unless pushed",
              "Child frequently rejects opportunities for seemingly desirable interaction with other children",
              "Child does not relate to other children. Either states he has 'no friends' or actively rejects former friends and any new children",
            ],
          },
          {
            id: 10,
            text: "Expressive Communication",
            scale: 3,
            description:
              "Refers primarily to possible psychomotor retardation of language. Rate on the quantity and quality of verbal material, considering cultural background and intelligence in the interview.",
            options: [
              "No information",
              "Normal",
              "Doubtful-mild. Monotonous voice. Mild delay in answering questions. Gives monosyllabic or short answers in all areas of the interview",
              "Moderate-severe. Same as mild but with prolonged delays in answering, greatly reduced verbal content, and possible poverty of facial expression",
            ],
          },
          {
            id: 11,
            text: "Sleep",
            scale: 3,
            description:
              "Evaluates the child's sleep patterns and potential difficulties as reported by the child and/or parents. Circle specific difficulties if applicable: Initial, Middle, Terminal.",
            options: [
              "No information",
              "No difficulty or occasional difficulty sleeping",
              "Mild - frequent difficulty sleeping. Child and/or parent may report this",
              "Moderate - difficulty with sleeping nearly every night. May be evidence of sleep deprivation (e.g., child looks tired)",
            ],
            specificDifficulty: ["No information/does not apply", "Initial", "Middle", "Terminal"],
          },
          {
            id: 12,
            text: "Disturbance of Eating Pattern",
            scale: 3,
            description:
              "Assesses changes in eating patterns, including undereating, overeating, and other severe disturbances, considering both child and parent reports.",
            options: [
              "No information",
              "No problem",
              "Mild - Mother complains of change in eating pattern or chronic problems with food, either some variety of 'poor eater' or overeats",
              "Moderate - More severe disturbance of eating pattern. If undereats, accompanied by weight loss. If overeats, has moderate obesity. May steal and hoard food or show more bizarre pattern such as eating out of garbage cans. Unable to follow a medically necessary diet prescribed by a physician",
            ],
          },
          {
            id: 13,
            text: "Frequent Physical Complaints",
            scale: 4,
            description:
              "Evaluates the frequency and impact of physical complaints such as stomach pains, headaches, or other bodily aches, considering parent and nurse input.",
            options: [
              "No information",
              "No complaints",
              "Occasional complaints - Child is easily reassured",
              "Frequent complaints - Can be distracted or reassured (e.g., school phobic who feels fine if allowed to stay home from school)",
              "Preoccupied with aches and pains, may keep child from other activities",
            ],
          },
          {
            id: 14,
            text: "General Somatic",
            scale: 3,
            description:
              "Assesses somatic symptoms, including fatigue and changes in physical energy, based on observations and child reports.",
            options: [
              "No information",
              "Normal",
              "Occasional complaints of fatigue",
              "Frequent - Complains of being tired, doesn’t feel like doing things they used to enjoy",
            ],
          },
          {
            id: 15,
            text: "Hypoactivity",
            scale: 3,
            description:
              "Considers the current activity level of the child compared to their usual activity level, including reports from parents, teachers, and nurses.",
            options: [
              "No information",
              "Activity at usual level",
              "Minimal retardation in activity",
              "Talks slowly, walks slowly, slow to move during play",
            ],
          },
          {
            id: 16,
            text: "Reversal of Affect",
            scale: 2,
            description:
              "Determines whether the child shows a reversal of affect in their behavior or interactions.",
            options: [
              "No information",
              "No",
              "Yes",
            ],
          },
        
  ]
  

  // Handle input change
  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [existingData, setExistingData] = useState(null);

  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
  const { appointment: { appointment, pastAppointments } = {} } = vaccineAppList || {};

  useEffect(() => {
    dispatch(detailsVacApp(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (appointment && appointment.cdrs) {
      setExistingData(appointment?.cdrs?.info);
    }
  }, [appointment]);

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateVacApp({ _id: appointment._id, cdrs: {info : formData , score : Object.values(formData).reduce((acc, value) => acc + value, 0)} }));
    dispatch(detailsVacApp(id));
    alert("Form submitted successfully")
  };

 

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Children's Depression Rating Scale (CDRS)</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q.id} style={{ marginBottom: "30px" }}>
            <h3>{q.id}. {q.text}</h3>
            <p>{q.description}</p>
            <div>
              {q.options.map((option, index) => (
                <label key={index} style={{ display: "block", margin: "5px 0" }}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    checked={formData[q.text] === index}
                    onChange={() => handleChange(q.text, index)}
                    required
                  />
                  {`  ${index} ${option}`}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CDRSForm;
