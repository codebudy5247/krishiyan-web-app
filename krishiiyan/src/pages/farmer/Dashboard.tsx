import React, { useState, useEffect } from "react";
import Header from "../../Components/layouts/Header";
import * as Api from "../../Services/Api";
import moment from "moment";
import { toast } from "react-toastify";
import Loader from "../../Components/themes/Loader";
import Weather from "./Weather";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [farmerID, setFarmerID] = useState("");
  const [farmerDetail, setFarmerDetail] = useState<any>();
  const [currentCultivation, setCurrentCultivation] = useState<any>();

  const onChangeInput = (e: any) => {
    setFarmerID(e.target.value);
  };
  const getFarmerById = async () => {
    if (farmerID) {
      setLoading(true);
      const [err, res] = await Api.getFarmer(farmerID);
      if (err) {
        console.log(err);
        toast.error(err.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (res) {
        console.log(res);
        if (res?.data === null) {
          toast.error("Farmer not found!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setFarmerDetail(res?.data);
      }

      setLoading(false);
    }
  };

  const onClickEnter = async () => {
    await getFarmerById();
  };

  //Get Farmer Cultivations
  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getFarmerCultivationData(farmerDetail?._id);
      if (res) {
        let current_cultivation =
          res?.data?.farmerCultivationData[
            res?.data?.farmerCultivationData.length - 1
          ];
        setCurrentCultivation(current_cultivation);
      }
    };
    init();
  }, [farmerID, farmerDetail]);

  return (
    <div>
      <Header title="Farmer Relationship Management" subtitle="Dashboard" />

      <section>
        <div className="grid grid-cols-[70%_30%] items-center box-border w-full">
          <div className="grid grid-cols-[35%_45%_15%_5%] mt-7 flex-row items-center w-full">
            <label className="text-[#13490A] font-roboto font-extrabold text-sm flex justify-center">
              Farmer Mobile Number
            </label>
            <input
              onChange={onChangeInput}
              // value={farmerID}
              type="text"
              className="bg-[#F3FFF1] h-8 lg:w-[86%] xl:w-[90%] lg:ml-2 xl:ml-[1%] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md pr-3 pl-3"
            />
            {loading ? (
              <button
                type="submit"
                disabled={loading}
                className="bg-[#05AB2A] text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] py-1 w-full rounded text-sm font-thin"
              >
                {/* <Loader /> */}
                Fetching Info...
              </button>
            ) : (
              <button
                type="submit"
                onClick={onClickEnter}
                className="bg-[#05AB2A] text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] py-1 w-[6vw] rounded text-sm font-thin"
              >
                ENTER
              </button>
            )}
            <Weather />
          </div>

          {/* Farmer Info */}
          {farmerDetail ? (
            <div className="mt-6 leading-4">
              <p className="text-[#000000]">
                Name:{" "}
                <span className="text-[#FB0404] font-bold">
                  {farmerDetail?.name}
                </span>
              </p>
              <p className="text-[#000000] ml-4">
                Area :{" "}
                <span className="text-[#FB0404] font-bold">
                  {farmerDetail?.address?.street}
                </span>
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* Content */}
        {loading ? (
          <>
            <div className="flex justify-center item-center mt-10 ">
              <p className="text-[#00FF00] font-bold text-md">
                {" "}
                Loading farmer details...
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center mx-[5%] gap-y-8 mt-5">
              <div className="flex lg:gap-x-[5%] xl:gap-x-[5%] w-full">
                {/* General Information */}
                {farmerDetail ? (
                  <table className="table-auto border-collapse border border-black font-bold text-base w-[40%] mx-auto">
                    <thead className="border-b border-black">
                      <tr className="text-center ">
                        <th
                          className="border-b border-black py-[1.2%] "
                          colSpan={2}
                        >
                          General
                        </th>
                      </tr>
                      <tr className="text-center">
                        <th className="border-r border-black py-[1.2%]">
                          Member Since :
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          {moment(farmerDetail?.createdAt).format("MM/DD/YYYY")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Stage1 */}
                      <tr className="h-10 border-b border-black">
                        <td className="border-r border-black">
                          Total Farm Area(Acre) :
                        </td>

                        <td className="border-r border-black">
                          {farmerDetail?.totalLandArea}
                        </td>
                      </tr>
                      <tr className="h-10 border-b border-black">
                        <td className="border-r border-black">
                          Soil test date :
                        </td>

                        <td className="border-r border-black">
                          {moment(farmerDetail?.updatedAt).format("MM/DD/YYYY")}
                        </td>
                      </tr>
                      <tr className="h-10 border-b border-black">
                        <td className="border-r border-black">
                          Credit score :
                        </td>

                        <td className="border-r border-black">
                          ₹{farmerDetail?.creditLimit?.toString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <></>
                )}

                {/* Current Cultivation */}
                {currentCultivation ? (
                  <table className="table-auto border-collapse border border-black font-bold text-base w-[50%] mx-auto">
                    <thead className="border-b border-black">
                      <tr className="text-center ">
                        <th
                          className="border-b border-black py-[1.2%] "
                          colSpan={5}
                        >
                          Current Cultivation
                        </th>
                      </tr>
                      <tr className="text-center">
                        <th className="border-r border-black py-[1.2%]">
                          S.No
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Crop
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Area(Acre)
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Age(Date of sowing)
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Harvested
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Stage1 */}
                      <tr className="h-10 border-b border-black">
                        <td className="border-r border-black">
                          {/* {currentCultivation?.slotNumber} */}1
                        </td>

                        <td className="border-r border-black">
                          {currentCultivation?.crop}
                        </td>
                        <td className="border-r border-black">
                          {currentCultivation?.area}
                        </td>
                        <td className="border-r border-black">
                          {moment(currentCultivation?.dateOfSowing).format(
                            "MM/DD/YYYY"
                          )}
                        </td>
                        <td className="border-r border-black">Yes</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex lg:gap-x-[5%] xl:gap-x-[5%] w-full ">
                {/* History Of Purchase */}
                {farmerDetail ? (
                  <table className="table-auto border-collapse border border-black font-bold text-base w-[40%] mx-auto ml-3">
                    <thead className="border-b border-black">
                      <tr className="text-center ">
                        <th
                          className="border-b border-black py-[1.2%] "
                          colSpan={5}
                        >
                          History of Purchase
                        </th>
                      </tr>
                      <tr className="text-center">
                        <th className="border-r border-black py-[1.2%]">
                          S.No
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Date
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Products
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Stage1 */}
                      <tr className="h-10 border-b border-black">
                        <td className="border-r border-black">
                          {/* {currentCultivation?.slotNumber} */}02
                        </td>

                        <td className="border-r border-black">12/03/22</td>
                        <td className="border-r border-black">
                          Urea, Complex B
                        </td>
                        <td className="border-r border-black">₹803.00</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <></>
                )}

                {/* Issues Resolved */}
                {farmerDetail ? (
                  <div className="flex flex-col flex-1 h-fit text-center">
                    {farmerDetail ? (
                      <table className="table-auto border-collapse border border-black font-bold text-base w-[85%] mx-auto">
                        <thead className="border-b border-black">
                          <tr className="text-center ">
                            <th
                              className="border-b border-black py-[1.2%] "
                              colSpan={5}
                            >
                              Issues resolved
                            </th>
                          </tr>
                          <tr className="text-center">
                            <th className="border-r border-black py-[1.2%]">
                              S.No
                            </th>
                            <th className="border-r border-black py-[1.2%]">
                              Date
                            </th>
                            <th className="border-r border-black py-[1.2%]">
                              Crop
                            </th>
                            <th className="border-r border-black py-[1.2%]">
                              Issue
                            </th>
                            <th className="border-r border-black py-[1.2%]">
                              Suggestion
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Stage1 */}
                          <tr className="h-10 border-b border-black">
                            <td className="border-r border-black">
                              {/* {currentCultivation?.slotNumber} */}01
                            </td>

                            <td className="border-r border-black">12/03/22</td>
                            <td className="border-r border-black">Maize</td>
                            <td className="border-r border-black">Resolved</td>
                            <td className="border-r border-black">test...</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
