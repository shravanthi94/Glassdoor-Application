import React from 'react';
import { Link } from 'react-router-dom';

const StudentProfile = () => {
  return (
    <div>
      <Link to='/student/update/jobPreference'>Update Job Preference</Link>
    </div>
  );
};

export default StudentProfile;
