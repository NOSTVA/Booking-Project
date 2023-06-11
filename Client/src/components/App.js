import React, { useState, useEffect } from "react";
import PersonsField from "./PersonsField";
import CreatePerson from "./CreatePerson";

import { Container } from "@chakra-ui/react";

function App() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  async function fetchApplicants() {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/appointments/applicants`);
      const data = await res.json();
      setApplicants(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function fetchApplicant(id) {
    setLoading(true);
    try {
      if (!id.trim()) {
        fetchApplicants();
      } else {
        const res = await fetch(`/api/v1/appointments/applicants/${id}`);
        const data = await res.json();
        data ? setApplicants([data]) : setApplicants([]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function updateApplicant(id, data) {
    setLoading(true);
    try {
      await fetch(`/api/v1/appointments/applicants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await fetchApplicants();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function deleteApplicant(id) {
    setLoading(true);
    try {
      await fetch(`/api/v1/appointments/applicants/${id}`, {
        method: "DELETE",
      });
      await fetchApplicants();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function createApplicant(formData) {
    setLoading(true);
    try {
      await fetch(`/api/v1/appointments/applicants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await fetchApplicants();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <Container maxW="8xl" pt={10}>
      <PersonsField
        applicants={applicants}
        fetchApplicants={fetchApplicants}
        fetchApplicant={fetchApplicant}
        updateApplicant={updateApplicant}
        deleteApplicant={deleteApplicant}
        loading={loading}
      />
      <CreatePerson createApplicant={createApplicant} />
    </Container>
  );
}

export default App;
