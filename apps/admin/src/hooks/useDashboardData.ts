import { useEffect, useState } from 'react';

import {
  fetchCourses,
  fetchOrders,
  fetchStudentProfile,
  fetchStudentCourses,
  type CourseItem,
  type OrderItem,
  type StudentCourseItem,
  type StudentProfile,
} from '../lib/api';

type DashboardState = {
  courses: CourseItem[];
  studentCourses: StudentCourseItem[];
  orders: OrderItem[];
  profile: StudentProfile | null;
  loading: boolean;
  error: string | null;
};

const initialState: DashboardState = {
  courses: [],
  studentCourses: [],
  orders: [],
  profile: null,
  loading: true,
  error: null,
};

export function useDashboardData() {
  const [state, setState] = useState<DashboardState>(initialState);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [profile, courses, studentCourses, orders] = await Promise.all([
          fetchStudentProfile(),
          fetchCourses(),
          fetchStudentCourses(),
          fetchOrders(),
        ]);

        if (!active) {
          return;
        }

        setState({
          profile,
          courses,
          studentCourses,
          orders,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!active) {
          return;
        }

        setState({
          ...initialState,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  return state;
}
