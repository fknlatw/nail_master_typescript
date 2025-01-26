import EntriesTable from "../../components/EntriesTable/EntriesTable";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import InputForm from "../../components/InputForm/InputForm";
import "./Home.scss";

const Home = () => {
  return (
    <div className="container home_container">
      <div className="left-wrapper">
        <InputForm />
        <FiltersForm />
      </div>

      <div className="right-wrapper">
        <EntriesTable />
      </div>
    </div>
  )
}

export default Home