import "dayjs/locale/es-mx";
import React, { useState, useContext } from "react";
import CalendarApp from "../components/Calendar";
import { AuthContext } from '@/context/auth/AuthContext';
import MainLayout from '@/components/Layout/Layout';
const CalendarPage: React.FC = () => {
  const {user} = useContext(AuthContext);
  return (
      <MainLayout>
       <CalendarApp 
       type="user"
       id= {user.id} 
       ></CalendarApp>
      </MainLayout>

  );
};

export default CalendarPage;