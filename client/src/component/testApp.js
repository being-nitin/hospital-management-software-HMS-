import React, { useState, useCallback, useRef, useEffect } from "react";
import { useAppointments, useInfiniteAppointments } from "./api/app.js";
import AppointmentDetail from "./appointmentDetail.js";

const TextApp = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteAppointments({
    limit: 2,
  });

  const handleObserver = useRef();

  const lastElement = useCallback(
    (element) => {
      if (isLoading || isFetchingNextPage) return; // Prevent triggering if still loading or fetching
      if (handleObserver.current) handleObserver.current.disconnect(); // Clean up the previous observer
      console.log(element)
      handleObserver.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage) {
            console.log("Fetching next page...");
            fetchNextPage(); // Fetch next page when the last item is visible
          }
        });
      });

      if (element) handleObserver.current.observe(element); // Start observing the last element
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage] // Add fetchNextPage and others in the dependencies to ensure they are stable
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(fetchNextPage);

  return (
    <div>
      <h2>Appointments</h2>
      {data?.pages?.map((group, index) =>
        group.appointment.map((app, i) => {
          const isLastItem = index === data.pages.length - 1 && i === group.appointment.length - 1; // Check if this is the last item in the list
          return (
            <AppointmentDetail
              lastElement={isLastItem ? lastElement : null} 
              key={app._id}
              app={app}
            />
          );
        })
      )}
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default TextApp;
