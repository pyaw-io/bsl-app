import { useSelector } from "react-redux";
import { target } from "../../../features/readingSlice";
import classes from "./RecordHeader.module.css";

const RecordHeader = () => {
  const initialtarget = useSelector(target);

  return (
    <tr className={classes.header}>
      <th>DATE</th>
      {Object.keys(initialtarget).map((data, index) => (
        <td key={index}>{data.replace('_',' ')}</td>
      ))}
    </tr>
  );
};

export default RecordHeader;
