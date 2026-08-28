import axios from "axios";

async function test() {
  const client = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  try {
    // 1. Get services
    console.log("Fetching services...");
    let res = await client.get("/api/v1/services");
    console.log("Services:", res.data.data.items.length);
    const serviceId = res.data.data.items[0].id;

    // 2. Start intake
    console.log("Starting intake for service", serviceId);
    res = await client.post("/api/v1/public/intake/start", {
      serviceOfferingId: serviceId,
      fullName: "Test User",
      phoneNumber: "9876543210",
      email: "test@example.com"
    });
    console.log("Start response:", res.data);

    const { caseId, intakeToken } = res.data.data;
    
    // 3. Save an answer using the proxy and X-Intake-Token header
    console.log("Saving answer with token", intakeToken);
    res = await client.post(`/api/v1/public/intake/cases/${caseId}/answers`, {
      question: "Test question?",
      answer: "Test answer"
    }, {
      headers: {
        "X-Intake-Token": intakeToken
      }
    });
    console.log("Save answer response:", res.data);

    // 4. Test resume URL redirect
    console.log("Testing resume redirect...");
    res = await client.get(`/api/v1/public/intake/resume/${intakeToken}`, {
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 400
    });
    console.log("Resume status:", res.status);
    console.log("Set-Cookie:", res.headers["set-cookie"]);

  } catch (err: any) {
    console.error("ERROR:", err.response?.status, err.response?.data || err.message);
  }
}

test();
