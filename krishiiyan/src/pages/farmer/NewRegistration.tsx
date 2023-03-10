import React, { useState, useEffect } from "react";
import Header from "../../Components/layouts/Header";
import { Box, Checkbox } from "@mui/material";
import { Input } from "@material-tailwind/react";
import * as Api from "../../Services/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/themes/Loader";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { log } from "console";

const PlantationOptions = [
  {
    value: "ORGANIC",
  },
  {
    value: "NON-ORGANIC",
  },
  {
    value: "BOTH",
  },
];
const NewRegistration = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState<any>();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [totalLandArea, setTotalLandArea] = useState("");
  const [dealerFarmerRel, setDealerFarmerRel] = useState("");
  const [plantationType, setPlantationType] = useState("");

  const [loading, setLoading] = useState(false);

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };
  const onChangePhone = (e: any) => {
    setPhone(e.target.value);
  };
  const onChangeZip = (e: any) => {
    setZip(e.target.value);
  };
  const onChangeStreet = (e: any) => {
    setStreet(e.target.value);
  };
  const onChangeIsWhatsapp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsWhatsapp(event.target.checked);
  };

  const onChangeTotalLandArea = (e: any) => {
    setTotalLandArea(e.target.value)
  };
  const onChangeDealerFarmerRel = (e: any) => {
    setDealerFarmerRel(e.target.value)
  };
  const onChangePlantationType = (e: any, value: any) => {
    setPlantationType(value.value)
  };

  //Get farmer location
  useEffect(() => {
    async function getLoc() {
      if (zip.length > 5) {
        setLoading(true);
        const [err, res] = await Api.getFarmerLocation(zip);
        if (err) {
          toast.error(err.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        if (res) {
          let state = res.data.PostOffice.map((o: any) => o?.State);
          let city = res.data.PostOffice.map((o: any) => o?.District);
          setState(state[0]);
          setCity(city[0]);
        }
        setLoading(false);
      }
    }
    getLoc();
  }, [zip]);

  const onSubmitHandler = async () => {
    if (
      state === "" ||
      (state === undefined && city === "") ||
      city === undefined
    ) {
      toast.error("Please enter valid Pincode", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      const [error, response] = await Api.createFarmer(
        name,
        phone,
        isWhatsapp,
        state,
        city,
        zip,
        street,
        totalLandArea,
        dealerFarmerRel,
        plantationType
      );
      if (error) {
        // console.log(error.data);
        toast.error(error.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (response) {
        // console.log(response);
        toast.success("New farmer created!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <div>
      <Header title="Farmer" subtitle="New Registration" />
      <section>
        <div className="grid grid-cols-[25%_34%] items-center mt-6 mb-5">
          <label className="text-[#13490A] font-roboto text-center font-extrabold text-sm mx-5">
            Name
          </label>
          <input
            type="text"
            className="bg-[#F3FFF1] h-8 w-80 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md"
            onChange={onChangeName}
          ></input>
        </div>
        <div className="grid grid-cols-[50%_50%] gap-x-16">
          <div className=" grid grid-cols-[50%_34%] items-center">
            <label className="text-[#13490A] font-roboto text-center font-extrabold text-sm mx-5">
              Mobile Number
            </label>
            <input
              type="text"
              className="bg-[#F3FFF1] h-8 w-80 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md"
              onChange={onChangePhone}
            ></input>
          </div>
          <div className="grid grid-cols-[35%_5%] justify-items-end items-center">
            <label className="text-[#13490A] font-roboto font-extrabold text-sm mx-5 ">
              Whatsapp
            </label>
            <Checkbox
              checked={isWhatsapp}
              onChange={onChangeIsWhatsapp}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>
        <img src="Images/Line18.png" className="my-5" alt="line" />
        <div className="grid grid-cols-[25%_27%]">
          <label className="text-[#13490A] font-roboto text-center font-extrabold text-sm mx-5">
            Address
          </label>
          <div>
            <div className="w-73 mt-2">
              <Input label="Zip" onChange={onChangeZip} />
            </div>
            <div className="flex w-73 mt-2 gap-2">
              <Input label="State" value={state} disabled />{" "}
              {loading ? <Loader /> : null}
            </div>
            <div className="flex w-73 mt-2 gap-2">
              <Input label="City" value={city} disabled />{" "}
              {loading ? <Loader /> : null}
            </div>
            <div className="w-73 mt-2">
              <Input label="Street" onChange={onChangeStreet} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[25%_34%] items-center mt-6 mb-5">
          <label className="text-[#13490A] font-roboto text-center font-extrabold text-sm mx-5">
            Total Land Area(Acre)
          </label>
          <input
            type="text"
            className="bg-[#F3FFF1] h-8 w-80 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md"
            onChange={onChangeTotalLandArea}
          ></input>
        </div>

        <div className="grid grid-cols-[25%_34%] items-center mt-6 mb-5">
          <label className="text-[#13490A] font-roboto text-center font-extrabold text-sm mx-5">
            Dealer Farmer Relation
          </label>
          <input
            type="text"
            className="bg-[#F3FFF1] h-8 w-80 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md"
            onChange={onChangeDealerFarmerRel}
          ></input>
        </div>

        <div className="grid grid-cols-[25%_34%] items-center mt-6 mb-5">
          <label className="text-[#13490A] font-roboto text-center font-extrabold text-sm mx-5">
            Plantation type
          </label>
          <Autocomplete
            onChange={onChangePlantationType}
            id="plantation-select"
            sx={{ width: 340 }}
            options={PlantationOptions}
            autoHighlight
            getOptionLabel={(option) => option.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose plantation type"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-[38%_27%] w-[80%] lg:w-[88%] xl:w-[78%] 2xl:w-[65%]">
          <div className=""></div>
          <button
            onClick={onSubmitHandler}
            type="submit"
            className="bg-[#05AB2A] text-[#F3FFF1] w-[8vw] h-8  mt-3 shadow-[0px_4px_3px_rgba(0,0,0,0.25)] rounded text-sm font-thin"
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewRegistration;
