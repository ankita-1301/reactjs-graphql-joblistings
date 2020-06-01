import React from "react";
import { Card } from "antd";
import "../styles.css";

const JobCards = ({ data }) => {
  return (
    <div>
      {data.map(job => {
        return (
          <Card className="job-cards" key={`title_${job.id}`} title={job.title}>
            <p className="job-card-para" key={`company_${job.id}`}>
              Company : {job.company.name}
            </p>
            <p className="job-card-para" key={`city_${job.id}`}>
              City : {job.city}
            </p>
          </Card>
        );
      })}
    </div>
  );
};

export default JobCards;
