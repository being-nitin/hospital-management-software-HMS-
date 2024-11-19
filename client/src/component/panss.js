import React, { useState } from "react";

const PanssForm = () => {
  const items = [
    {
      id: "delusions",
      name: "Delusions",
      description:
        "Beliefs which are unfounded, unrealistic, and idiosyncratic. Basis for rating thought content expressed in the interview and its influence on social relations and behavior.",
      options: [
        { value: 1, label: "1 Absent - Definition does not apply" },
        { value: 2, label: "2 Minimal - Questionable pathology; may be at the upper extreme of normal limits." },
        { value: 3, label: "3 Mild - Presence of one or two delusions which are vague, uncrystallized, and not tenaciously held. Delusions do not interfere with thinking, social relations, or behavior." },
        { value: 4, label: "4 Moderate - Presence of either a kaleidoscopic array of poorly formed, unstable delusions or of a few well-formed delusions that occasionally interfere with thinking, social relations, or behavior." },
        { value: 5, label: "5 Moderate Severe - Presence of numerous well-formed delusions that are tenaciously held and occasionally interfere with thinking, social relations, or behavior." },
        { value: 6, label: "6 Severe - Presence of a stable set of delusions which are crystallized, possibly systematized, tenaciously held, and clearly interfere with thinking, social relations, and behavior." },
        { value: 7, label: "7 Extreme - Presence of a stable set of delusions which are either highly systematized or very numerous, and which dominate major facets of the patient's life. This frequently results in inappropriate and irresponsible action, which may even jeopardize the safety of the patient or others." },
      ],
    },
    {
        id: "conceptual_disorganization",
        name: "Conceptual Disorganization",
        description:
          "Thought processes that are confused, disconnected, or disorganized. Evaluate the flow of ideas and the logical connections between thoughts.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Occasionally exhibits slight tangentiality or circumstantiality, but thoughts remain comprehensible." },
          { value: 3, label: "3 Mild - Exhibits occasional incoherence, vagueness, or confusion, but can generally convey basic ideas." },
          { value: 4, label: "4 Moderate - Regular episodes of tangential or incoherent speech that disrupt communication." },
          { value: 5, label: "5 Moderate Severe - Frequently incoherent or irrelevant speech that hinders communication significantly." },
          { value: 6, label: "6 Severe - Marked disorganization of thought with frequent derailment or incoherence." },
          { value: 7, label: "7 Extreme - Consistent incomprehensibility or chaotic thought processes that render communication impossible." },
        ],
      },
      {
        id: "hallucinatory_behavior",
        name: "Hallucinatory Behavior",
        description:
          "Perceptions without external stimuli, which may affect thinking, social relations, or behavior. Rate based on the frequency and impact on functioning.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Vague, infrequent hallucinatory experiences without functional impact." },
          { value: 3, label: "3 Mild - Occasionally experiences hallucinatory phenomena, which may slightly influence behavior." },
          { value: 4, label: "4 Moderate - Regular hallucinatory episodes with occasional disruption of thinking or behavior." },
          { value: 5, label: "5 Moderate Severe - Frequent hallucinations that significantly disrupt thinking, behavior, or relationships." },
          { value: 6, label: "6 Severe - Persistent hallucinations that dominate thought and behavior." },
          { value: 7, label: "7 Extreme - Constant and overwhelming hallucinations, resulting in severe dysfunction." },
        ],
      },
      {
        id: "excitement",
        name: "Excitement",
        description:
          "Hyperactivity, excessive energy, or heightened mood not appropriate to the context. Includes pacing, overtalking, or impulsivity.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Occasional hyperactive behaviors, but generally manageable." },
          { value: 3, label: "3 Mild - Intermittent overactivity or increased energy that disrupts focus slightly." },
          { value: 4, label: "4 Moderate - Frequent hyperactivity that affects social interactions or productivity." },
          { value: 5, label: "5 Moderate Severe - Marked overactivity that is disruptive in most contexts." },
          { value: 6, label: "6 Severe - Severe, constant hyperactivity that dominates behavior." },
          { value: 7, label: "7 Extreme - Uncontrollable hyperactivity and impulsive behavior that severely impair functioning." },
        ],
      },
      {
        id: "hostility",
        name: "Hostility",
        description:
          "Verbal or physical aggression, irritability, or resentment directed toward others. Evaluate based on frequency, intensity, and context.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Rare or mild irritability without significant aggression." },
          { value: 3, label: "3 Mild - Occasional verbal hostility or mild irritation that resolves quickly." },
          { value: 4, label: "4 Moderate - Regular irritability or verbal aggression that disrupts social interactions." },
          { value: 5, label: "5 Moderate Severe - Frequent verbal or occasional physical aggression that affects relationships." },
          { value: 6, label: "6 Severe - Persistent verbal and physical aggression that severely disrupt social functioning." },
          { value: 7, label: "7 Extreme - Constant, uncontrollable aggression and hostility that render the individual a danger to others." },
        ],
      },
      {
        id: "blunted_affect",
        name: "Blunted Affect",
        description:
          "Diminished emotional expression, such as flat facial expressions or reduced body language, tone, and emotional responsiveness.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight reduction in emotional expression." },
          { value: 3, label: "3 Mild - Noticeable reduction in emotional responsiveness, but emotions are still observable." },
          { value: 4, label: "4 Moderate - Marked reduction in emotional expression, significantly affecting interactions." },
          { value: 5, label: "5 Moderate Severe - Severe flattening of affect with minimal emotional expression." },
          { value: 6, label: "6 Severe - Near-complete absence of emotional responsiveness, very limited emotional range." },
          { value: 7, label: "7 Extreme - Complete absence of emotional expression, resulting in severely diminished interactions." },
        ],
      },
      {
        id: "emotional_withdrawal",
        name: "Emotional Withdrawal",
        description:
          "Lack of emotional involvement with others or disconnection from the social environment.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Occasional aloofness but maintains some emotional engagement." },
          { value: 3, label: "3 Mild - Regular emotional detachment but still engages with others in limited ways." },
          { value: 4, label: "4 Moderate - Noticeable emotional withdrawal, with minimal reciprocal emotional interactions." },
          { value: 5, label: "5 Moderate Severe - Frequent emotional isolation, avoiding most social or emotional contact." },
          { value: 6, label: "6 Severe - Almost complete lack of emotional engagement with others." },
          { value: 7, label: "7 Extreme - Total emotional withdrawal, with complete disconnection from the social environment." },
        ],
      },
      {
        id: "anxiety",
        name: "Anxiety",
        description:
          "Subjective experience of nervousness, tension, worry, or apprehension, often accompanied by physical symptoms like sweating or rapid heartbeat.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight worry or tension, does not interfere with functioning." },
          { value: 3, label: "3 Mild - Occasional feelings of nervousness or tension, mildly interfering with daily activities." },
          { value: 4, label: "4 Moderate - Frequent anxiety that causes noticeable distress or interference in daily functioning." },
          { value: 5, label: "5 Moderate Severe - Persistent anxiety that significantly impacts ability to focus or perform tasks." },
          { value: 6, label: "6 Severe - Intense anxiety or tension that dominates thoughts and significantly impairs functioning." },
          { value: 7, label: "7 Extreme - Constant, overwhelming anxiety that severely disrupts daily life and functioning." },
        ],
      },
      {
        id: "guilt_feelings",
        name: "Guilt Feelings",
        description:
          "Sense of guilt or remorse, often out of proportion to the situation. Evaluate the frequency, intensity, and impact of these feelings.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight feelings of guilt, does not interfere with functioning." },
          { value: 3, label: "3 Mild - Noticeable feelings of guilt, occasionally interfering with thinking or behavior." },
          { value: 4, label: "4 Moderate - Frequent guilt feelings that impact thought patterns or decision-making." },
          { value: 5, label: "5 Moderate Severe - Persistent guilt that disrupts normal social or occupational functioning." },
          { value: 6, label: "6 Severe - Intense guilt dominating thought patterns and causing significant impairment." },
          { value: 7, label: "7 Extreme - Overwhelming guilt that paralyzes behavior and severely disrupts life." },
        ],
      },
      {
        id: "somatic_concern",
        name: "Somatic Concern",
        description:
          "Preoccupation with physical health, bodily functions, or physical symptoms, often with no medical basis.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Occasional concern about minor physical symptoms, not impairing functioning." },
          { value: 3, label: "3 Mild - Persistent preoccupation with physical symptoms that cause mild distress." },
          { value: 4, label: "4 Moderate - Frequent somatic concerns that interfere with daily activities." },
          { value: 5, label: "5 Moderate Severe - Preoccupation with physical health that significantly disrupts functioning." },
          { value: 6, label: "6 Severe - Intense somatic concerns that dominate thoughts and behavior." },
          { value: 7, label: "7 Extreme - Complete preoccupation with somatic concerns, severely impairing functioning." },
        ],
      },
      {
        id: "excitement",
        name: "Excitement",
        description:
          "Hyperactivity, restlessness, or excessive enthusiasm that may lead to disruptive or impulsive behavior.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight restlessness, not disruptive to functioning." },
          { value: 3, label: "3 Mild - Noticeable hyperactivity or enthusiasm, occasionally disruptive." },
          { value: 4, label: "4 Moderate - Frequent excitement or hyperactivity that disrupts interactions." },
          { value: 5, label: "5 Moderate Severe - Persistent hyperactivity or impulsive behavior causing significant disruptions." },
          { value: 6, label: "6 Severe - Intense excitement or hyperactivity dominating behavior, significantly impairing interactions." },
          { value: 7, label: "7 Extreme - Uncontrollable excitement or hyperactivity severely disrupting all aspects of functioning." },
        ],
      },
      {
        id: "suspiciousness",
        name: "Suspiciousness/Persecution",
        description:
          "Unwarranted belief that others are intent on harming, harassing, or manipulating the individual. Evaluate based on frequency, intensity, and impact on behavior and social relations.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight mistrust or suspicion, not interfering with functioning." },
          { value: 3, label: "3 Mild - Noticeable suspicion that occasionally affects social interactions." },
          { value: 4, label: "4 Moderate - Frequent suspicion or mistrust that disrupts social interactions and relationships." },
          { value: 5, label: "5 Moderate Severe - Persistent suspiciousness that significantly impairs functioning and relationships." },
          { value: 6, label: "6 Severe - Intense and pervasive suspicion dominating thought patterns and social behavior." },
          { value: 7, label: "7 Extreme - Paranoid beliefs severely disrupting social, occupational, and personal functioning." },
        ],
      },
      {
        id: "poor_impulse_control",
        name: "Poor Impulse Control",
        description:
          "Difficulty in self-regulation, leading to aggressive outbursts, socially inappropriate actions, or impulsive decision-making.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Occasional impulsive actions, no significant harm or impact." },
          { value: 3, label: "3 Mild - Noticeable impulsive behaviors that occasionally disrupt functioning." },
          { value: 4, label: "4 Moderate - Frequent impulsive behaviors that interfere with relationships or responsibilities." },
          { value: 5, label: "5 Moderate Severe - Persistent impulsivity causing significant disruptions or harm." },
          { value: 6, label: "6 Severe - Intense impulsive behaviors that dominate actions, leading to serious consequences." },
          { value: 7, label: "7 Extreme - Uncontrollable impulsive behaviors, resulting in severe harm or disruptions." },
        ],
      },
      {
        id: "uncooperativeness",
        name: "Uncooperativeness",
        description:
          "Resistance to authority, refusal to comply with reasonable requests, or overt hostility toward others.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight uncooperativeness or mild reluctance to comply." },
          { value: 3, label: "3 Mild - Noticeable resistance that occasionally disrupts interactions or progress." },
          { value: 4, label: "4 Moderate - Frequent uncooperativeness that impacts relationships or activities." },
          { value: 5, label: "5 Moderate Severe - Persistent resistance or hostility significantly impairing functioning." },
          { value: 6, label: "6 Severe - Intense resistance or defiance that disrupts most interactions." },
          { value: 7, label: "7 Extreme - Total refusal to cooperate or severe hostility toward others." },
        ],
      },
      {
        id: "social_withdrawal",
        name: "Social Withdrawal",
        description:
          "Detachment from social activities, relationships, or interactions, leading to isolation or diminished engagement with others.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Occasional withdrawal, but still maintains some engagement." },
          { value: 3, label: "3 Mild - Noticeable detachment that occasionally impacts relationships or participation." },
          { value: 4, label: "4 Moderate - Frequent withdrawal significantly affecting social interactions and activities." },
          { value: 5, label: "5 Moderate Severe - Persistent social isolation that disrupts normal functioning." },
          { value: 6, label: "6 Severe - Near-complete disengagement from social interactions and activities." },
          { value: 7, label: "7 Extreme - Total withdrawal from all social interactions, resulting in isolation." },
        ],
      },
      {
        id: "lack_of_spontaneity",
        name: "Lack of Spontaneity and Flow of Conversation",
        description:
          "Reduced ability to initiate or maintain a conversation, marked by delayed responses, lack of engagement, or monotony.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slightly reduced spontaneity, but still functional." },
          { value: 3, label: "3 Mild - Noticeable delays or monotony in conversation, mildly disruptive." },
          { value: 4, label: "4 Moderate - Regular difficulty maintaining conversational flow, affecting communication." },
          { value: 5, label: "5 Moderate Severe - Persistent difficulty in initiating or sustaining conversations." },
          { value: 6, label: "6 Severe - Severe reduction in conversational ability, frequent delays or lack of engagement." },
          { value: 7, label: "7 Extreme - Complete lack of spontaneity or conversational flow, making communication impossible." },
        ],
      },
      {
        id: "motor_retardation",
        name: "Motor Retardation",
        description:
          "Observable slowing of physical movements, reactions, or gestures, impacting overall activity levels and responsiveness.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slightly slowed movements, not impairing functionality." },
          { value: 3, label: "3 Mild - Noticeable slowing of movements, occasionally disruptive." },
          { value: 4, label: "4 Moderate - Regular slowing of movements, significantly affecting daily activities." },
          { value: 5, label: "5 Moderate Severe - Persistent motor retardation that disrupts normal functioning." },
          { value: 6, label: "6 Severe - Severe slowing of movements, markedly impairing responsiveness and activity." },
          { value: 7, label: "7 Extreme - Complete motor retardation, rendering the individual nearly immobile." },
        ],
      },
      {
        id: "disorientation",
        name: "Disorientation",
        description:
          "Confusion or lack of awareness about time, place, or identity. Evaluate based on the individual’s ability to orient themselves in these areas.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight difficulty with orientation but no significant impact on functioning." },
          { value: 3, label: "3 Mild - Noticeable disorientation occasionally disrupting normal activities." },
          { value: 4, label: "4 Moderate - Regular disorientation, significantly affecting daily functioning." },
          { value: 5, label: "5 Moderate Severe - Persistent disorientation causing major disruptions." },
          { value: 6, label: "6 Severe - Severe disorientation rendering the individual incapable of managing daily tasks." },
          { value: 7, label: "7 Extreme - Complete disorientation, causing total dependency on others for basic functioning." },
        ],
      },
      {
        id: "poor_attention",
        name: "Poor Attention",
        description:
          "Difficulty maintaining focus or concentration on tasks or conversations. Evaluate based on observed behavior and self-reports.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Occasionally distracted, no significant impact on functioning." },
          { value: 3, label: "3 Mild - Noticeable difficulty maintaining focus, occasionally disruptive." },
          { value: 4, label: "4 Moderate - Frequent lapses in attention disrupting tasks and interactions." },
          { value: 5, label: "5 Moderate Severe - Persistent difficulty focusing, significantly impairing functioning." },
          { value: 6, label: "6 Severe - Severe inability to maintain attention, hindering basic activities." },
          { value: 7, label: "7 Extreme - Complete inability to focus, severely impairing all aspects of functioning." },
        ],
      },
      {
        id: "somatic_preoccupation",
        name: "Somatic Preoccupation",
        description:
          "Excessive concern with physical health or bodily functions, often with no medical basis. Evaluate based on the intensity and frequency of complaints.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Occasional concern with physical health, no significant impact." },
          { value: 3, label: "3 Mild - Noticeable preoccupation with health, occasionally disruptive." },
          { value: 4, label: "4 Moderate - Frequent focus on somatic issues, disrupting normal activities." },
          { value: 5, label: "5 Moderate Severe - Persistent preoccupation significantly impairing functioning." },
          { value: 6, label: "6 Severe - Severe somatic preoccupation dominating thoughts and behavior." },
          { value: 7, label: "7 Extreme - Constant somatic concerns severely impairing all functioning." },
        ],
      },
      {
        id: "preoccupation",
        name: "Preoccupation",
        description:
          "Recurrent thoughts or fixed ideas that dominate the individual’s thinking, often unrelated to the immediate context.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Occasional preoccupations, no significant impact on functioning." },
          { value: 3, label: "3 Mild - Noticeable preoccupations occasionally interfering with tasks or interactions." },
          { value: 4, label: "4 Moderate - Frequent preoccupations disrupting daily activities." },
          { value: 5, label: "5 Moderate Severe - Persistent preoccupations significantly impairing functioning." },
          { value: 6, label: "6 Severe - Severe preoccupations dominating thoughts and impairing functioning." },
          { value: 7, label: "7 Extreme - Constant preoccupations severely impairing all areas of life." },
        ],
      },
      {
        id: "unusual_thought_content",
        name: "Unusual Thought Content",
        description:
          "Odd, bizarre, or unrealistic thoughts and ideas. Evaluate based on the frequency, intensity, and impact of these thoughts on behavior.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slightly odd thoughts or ideas, no significant impact." },
          { value: 3, label: "3 Mild - Noticeable odd or unrealistic thoughts occasionally affecting behavior." },
          { value: 4, label: "4 Moderate - Frequent unusual thoughts that disrupt interactions or tasks." },
          { value: 5, label: "5 Moderate Severe - Persistent bizarre thoughts significantly impairing functioning." },
          { value: 6, label: "6 Severe - Severe unusual thoughts dominating behavior and relationships." },
          { value: 7, label: "7 Extreme - Constant bizarre thoughts severely impairing all areas of functioning." },
        ],
      },
      {
        id: "emotional_flattening",
        name: "Emotional Flattening",
        description:
          "Reduction or absence of emotional expression, including facial expressions, voice tone, and gestures.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight reduction in emotional expressiveness, no significant impact." },
          { value: 3, label: "3 Mild - Noticeable flattening of affect occasionally affecting interactions." },
          { value: 4, label: "4 Moderate - Frequent emotional flattening disrupting social interactions." },
          { value: 5, label: "5 Moderate Severe - Persistent flattening of affect significantly impairing communication." },
          { value: 6, label: "6 Severe - Severe flattening of affect dominating interactions." },
          { value: 7, label: "7 Extreme - Complete absence of emotional expression, severely impairing interactions." },
        ],
      },
      {
        id: "tension",
        name: "Tension",
        description:
          "Observable signs of physical or emotional tension, such as restlessness, fidgeting, or nervousness.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight signs of tension, no significant impact on functioning." },
          { value: 3, label: "3 Mild - Noticeable tension occasionally affecting tasks or interactions." },
          { value: 4, label: "4 Moderate - Frequent tension disrupting social interactions or tasks." },
          { value: 5, label: "5 Moderate Severe - Persistent tension significantly impairing functioning." },
          { value: 6, label: "6 Severe - Severe tension dominating behavior and interactions." },
          { value: 7, label: "7 Extreme - Constant and overwhelming tension severely impairing all functioning." },
        ],
      },
      {
        id: "mannerisms",
        name: "Mannerisms and Posturing",
        description:
          "Odd or inappropriate movements, gestures, or postures that are not contextually relevant.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Occasional odd mannerisms, no significant impact." },
          { value: 3, label: "3 Mild - Noticeable mannerisms occasionally affecting social interactions." },
          { value: 4, label: "4 Moderate - Frequent mannerisms disrupting social interactions or tasks." },
          { value: 5, label: "5 Moderate Severe - Persistent mannerisms significantly impairing functioning." },
          { value: 6, label: "6 Severe - Severe mannerisms dominating behavior." },
          { value: 7, label: "7 Extreme - Constant odd postures or mannerisms severely impairing all aspects of functioning." },
        ],
      },
      {
        id: "self_neglect",
        name: "Self-Neglect",
        description:
          "Failure to maintain personal hygiene, grooming, or basic self-care activities.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight lapses in self-care, no significant impact." },
          { value: 3, label: "3 Mild - Noticeable neglect of self-care occasionally impacting appearance." },
          { value: 4, label: "4 Moderate - Frequent self-neglect significantly affecting appearance or hygiene." },
          { value: 5, label: "5 Moderate Severe - Persistent self-neglect causing major disruptions." },
          { value: 6, label: "6 Severe - Severe self-neglect leading to noticeable consequences in health or appearance." },
          { value: 7, label: "7 Extreme - Total neglect of self-care severely impairing all aspects of functioning." },
        ],
      },
      {
        id: "depression",
        name: "Depression",
        description:
          "Persistent feelings of sadness, hopelessness, or loss of interest in activities, as observed or reported.",
        options: [
          { value: 1, label: "1 Absent - Definition does not apply" },
          { value: 2, label: "2 Minimal - Slight sadness, no significant impact on functioning." },
          { value: 3, label: "3 Mild - Noticeable sadness occasionally affecting daily activities." },
          { value: 4, label: "4 Moderate - Frequent sadness or hopelessness disrupting normal functioning." },
          { value: 5, label: "5 Moderate Severe - Persistent sadness significantly impairing functioning." },
          { value: 6, label: "6 Severe - Severe depression dominating thoughts and behaviors." },
          { value: 7, label: "7 Extreme - Constant overwhelming depression severely impairing all aspects of life." },
        ],
      },
    // Add more items as needed
  ];

  const [formState, setFormState] = useState(
    items.reduce((acc, item) => ({ ...acc, [item.id]: "" }), {})
  );

  const handleChange = (id, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formState);
    alert("Form submitted! Check the console for details.");
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h1 className="text-center mb-4">PANSS Assessment Form</h1>
      {items.map((item) => (
        <div key={item.id} className="mb-4">
          <h5>{item.name}</h5>
          <p>{item.description}</p>
          {item.options.map((option) => (
            <div key={option.value} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={item.id}
                value={option.value}
                checked={formState[item.id] === option.value.toString()}
                onChange={(e) => handleChange(item.id, e.target.value)}
                id={`${item.id}-${option.value}`}
              />
              <label
                className="form-check-label"
                htmlFor={`${item.id}-${option.value}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default PanssForm;
