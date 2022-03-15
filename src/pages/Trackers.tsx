import { Typography } from "@mui/material";
import TrackerList from "../components/trackerList/TrackerList";

function Trackers() {
  return(
    <>
      <Typography variant="h1">Mes Trackers</Typography>
      <TrackerList />
    </>
  )
}
export default Trackers;