from celery import shared_task
import random

@shared_task
def run_risk_prediction(district_id):
    """
    Mock task to run AI risk prediction model.
    """
    print(f"Running AI Risk Prediction for District ID: {district_id}")
    # Simulate loading model and processing
    risk_score = random.uniform(0.1, 0.9)
    classification = "High" if risk_score > 0.7 else "Moderate" if risk_score > 0.4 else "Low"
    
    # In a real app, save this to RiskScore model
    print(f"Prediction Result: Score={risk_score:.2f}, Class={classification}")
    return {"district_id": district_id, "score": risk_score, "classification": classification}
