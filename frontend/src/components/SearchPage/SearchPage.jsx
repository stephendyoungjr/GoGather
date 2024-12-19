import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getEvents, getFavorites } from "../../store/events";
import DisplayEvents from "../DisplayEvents/DisplayEvents";

const SearchPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getFavorites());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => state.events.favorites);
  const searchResults = useSelector((state) => state.events.searchResults);

  return (
    <div className="body">
      <h3 style={{ display: "flex", marginLeft: "40px", marginTop: "40px" }}>
        {`Search query returned ${searchResults.length} results below:`}
      </h3>
      {searchResults.length > 0 ? (
        <DisplayEvents
          favorites={favorites}
          user={sessionUser}
          events={searchResults}
        />
      ) : (
        <h1
          style={{
            display: "flex",
            marginLeft: "40px",
            marginTop: "40px",
            color: "var(--orange)",
          }}
        >
          No events found.
        </h1>
      )}
    </div>
  );
};

export default SearchPage;
