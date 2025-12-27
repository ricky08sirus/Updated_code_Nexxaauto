import React, { useState } from "react";
import brandsWeCarry from "./brands-we-carry.svg";
import closeupShotMachineWithRacksPinionsFactory1 from "./closeup-shot-machine-with-racks-pinions-factory-1.svg";
import contactUsTodayForAQuickQuoteOnTheExactPartYouNeedOurTeamIsStandingByToHelp from "./contact-us-today-for-a-quick-quote-on-the-exact-part-you-need-our-team-is-standing-by-to-help.svg";
import frame109 from "./frame-109.svg";
import group49 from "./group-49.svg";
import group104 from "./group-104.svg";
import group105 from "./group-105.svg";
import group110 from "./group-110.svg";
import group155 from "./group-155.svg";
import group156 from "./group-156.svg";
import group167 from "./group-167.svg";
import group168 from "./group-168.svg";
import group184 from "./group-184.png";
import group193 from "./group-193.svg";
import image from "./image.png";
import phone from "./phone.png";
import readyToFindYourPart from "./ready-to-find-your-part.svg";
import rectangle2 from "./rectangle-2.svg";
import rectangle7 from "./rectangle-7.svg";
import rectangle34 from "./rectangle-34.svg";
import sortDown2 from "./sort-down-2.png";
import sortDown3 from "./sort-down-3.png";
import sortDown1 from "./sort-down.png";
import sortDown from "./sort-down.svg";
import vector11 from "./vector-11.svg";
import vector12 from "./vector-12.svg";
import weStockPartsForAllMajorAutomotiveBrands from "./we-stock-parts-for-all-major-automotive-brands.svg";

const carBrands = [
  { name: "Used Acura Parts", width: "w-[194px]" },
  { name: "Used BMW Parts", width: "w-[194px]" },
  { name: "Used Buick Parts", width: "w-[194px]" },
  { name: "Used Cadillac Parts", width: "w-[194px]" },
  { name: "Used Chevy Parts", width: "w-[194px]" },
  { name: "Used Chrysler Parts", width: "w-[194px]" },
  { name: "Used Daewoo Parts", width: "w-[194px]" },
  { name: "Used Daihatsu Parts", width: "w-[194px]" },
  { name: "Used Dodge Parts", width: "w-[194px]" },
  { name: "Used Oldsmobile Parts", width: "w-[258.55px]" },
  { name: "Used Plymouth Parts", width: "w-[258.55px]" },
  { name: "Used Pontiac Parts", width: "w-[258.55px]" },
  { name: "Used Subaru Parts", width: "w-[258.55px]" },
  { name: "Used Eagle Parts", width: "w-[258.55px]" },
  { name: "Used Ford Parts", width: "w-[258.55px]" },
  { name: "Used GMC Parts", width: "w-[258.55px]" },
  { name: "Used Hyundai Parts", width: "w-[213.93px]" },
  { name: "Used Isuzu Parts", width: "w-[213.93px]" },
  { name: "Used Jaguar Parts", width: "w-[213.93px]" },
  { name: "Used Jeep Parts", width: "w-[213.93px]" },
  { name: "Used Kia Parts", width: "w-[213.93px]" },
  { name: "Used Porsche Parts", width: "w-[213.93px]" },
  { name: "Used Saab Parts", width: "w-[213.93px]" },
  { name: "Used Saturn Parts", width: "w-[213.93px]" },
  { name: "Used Scion Parts", width: "w-[213.93px]" },
  { name: "Used Land Rover Parts", width: "w-[258.55px]" },
  { name: "Used Lexus Parts", width: "w-[258.55px]" },
  { name: "Used Lincoln Parts", width: "w-[258.55px]" },
  { name: "Used Mazda Parts", width: "w-[258.55px]" },
  { name: "Used Mercedes Parts", width: "w-[258.55px]" },
  { name: "Used Mercury Parts", width: "w-[258.55px]" },
  { name: "Used Mini Cooper Parts", width: "w-[258.55px]" },
  { name: "Used Mitsubishi Parts", width: "w-[258.55px]" },
  { name: "Used Nissan Parts", width: "w-[258.55px]" },
  { name: "Used Toyota Parts", width: "w-[258.55px]" },
  { name: "Used Volkswagen Parts", width: "w-[258.55px]" },
  { name: "Used Volvo Parts", width: "w-[258.55px]" },
  { name: "Used Suzuki Parts", width: "w-[258.55px]" },
];

export const HomeDsk = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="bg-white overflow-x-hidden w-full min-w-[1440px] min-h-[4025px] relative">
      <img
        className="absolute top-[480px] left-[322px] w-[37px] h-[21px]"
        alt="Sort down"
        src={sortDown}
      />

      <img
        className="absolute top-[106px] left-0 w-[1440px] h-[674px] aspect-[2.14]"
        alt="Closeup shot machine"
        src={closeupShotMachineWithRacksPinionsFactory1}
      />

      <img
        className="top-px w-[1440px] h-[782px] absolute left-0"
        alt="Rectangle"
        src={rectangle2}
      />

      <img
        className="top-[655px] w-[1440px] h-[186px] absolute left-0"
        alt="Rectangle"
        src={rectangle7}
      />

      <img
        className="absolute top-[360px] left-[59px] w-[737px] h-[262px]"
        alt="Group"
        src={group110}
      />

      <div className="absolute top-[370px] left-[865px] w-[501px] h-[237px] flex flex-col">
        <div className="w-[497.61px] h-[51px] relative bg-white rounded-[5px]">
          <div className="absolute top-0 left-0 w-[165px] h-[51px] flex bg-white border border-solid border-black">
            <div className="mt-[3px] w-[110px] ml-8 flex gap-[46px]">
              <label
                htmlFor="year-select"
                className="w-9 h-11 [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-base text-center tracking-[0] leading-[44px] whitespace-nowrap"
              >
                Year
              </label>

              <img
                className="mt-[13px] w-[26px] h-[19px]"
                alt="Sort down"
                src={sortDown1}
              />
            </div>
          </div>

          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="absolute top-0 left-0 w-[165px] h-[51px] opacity-0 cursor-pointer"
            aria-label="Select Year"
          >
            <option value="">Year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>

          <div className="absolute top-0 left-[165px] w-[167px] h-[51px] flex bg-white border border-solid border-black">
            <div className="mt-[3px] w-[127.1px] ml-[26.4px] flex gap-[33.4px]">
              <label
                htmlFor="make-select"
                className="w-[55.6px] h-11 [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-base text-center tracking-[0] leading-[44px]"
              >
                Make
              </label>

              <img
                className="mt-[13px] w-[36.14px] h-[19px]"
                alt="Sort down"
                src={image}
              />
            </div>
          </div>

          <select
            id="make-select"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="absolute top-0 left-[165px] w-[167px] h-[51px] opacity-0 cursor-pointer"
            aria-label="Select Make"
          >
            <option value="">Make</option>
            <option value="acura">Acura</option>
            <option value="bmw">BMW</option>
            <option value="ford">Ford</option>
            <option value="toyota">Toyota</option>
          </select>

          <div className="absolute top-0 left-[332px] w-[165px] h-[51px] flex bg-white border border-solid border-black">
            <div className="mt-[3px] w-[131.27px] ml-[26.4px] flex gap-[30.6px]">
              <label
                htmlFor="model-select"
                className="w-[62.55px] h-11 [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-base text-center tracking-[0] leading-[44px]"
              >
                Model
              </label>

              <img
                className="mt-[13px] w-[36.14px] h-[19px]"
                alt="Sort down"
                src={sortDown2}
              />
            </div>
          </div>

          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="absolute top-0 left-[332px] w-[165px] h-[51px] opacity-0 cursor-pointer"
            aria-label="Select Model"
          >
            <option value="">Model</option>
            <option value="model1">Model 1</option>
            <option value="model2">Model 2</option>
            <option value="model3">Model 3</option>
          </select>
        </div>

        <div className="ml-[1.4px] w-[499.61px] h-[51px] relative mt-3.5">
          <div className="top-0 w-[498px] h-[51px] bg-white rounded-[5px] absolute left-0" />

          <div className="bg-white absolute top-0 left-0 w-[165px] h-[51px] border border-solid border-black" />

          <div className="bg-white absolute top-0 left-[165px] w-[167px] h-[51px] border border-solid border-black" />

          <div className="bg-white absolute top-0 left-[332px] w-[165px] h-[51px] border border-solid border-black" />

          <div className="absolute top-px left-[76px] w-[165px] h-[49px] bg-white" />

          <div className="absolute top-px left-[232px] w-[165px] h-[49px] bg-white" />

          <img
            className="absolute top-[17px] left-[450px] w-9 h-[19px]"
            alt="Sort down"
            src={sortDown3}
          />

          <label
            htmlFor="category-select"
            className="absolute top-[3px] left-[170px] w-[175px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-base text-center tracking-[0] leading-[44px] whitespace-nowrap"
          >
            Part Category Category
          </label>

          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="absolute top-0 left-0 w-full h-[51px] opacity-0 cursor-pointer"
            aria-label="Select Part Category"
          >
            <option value="">Part Category</option>
            <option value="engine">Engine</option>
            <option value="transmission">Transmission</option>
            <option value="suspension">Suspension</option>
          </select>
        </div>

        <button
          className="w-[499.61px] h-[51px] relative mt-3.5 cursor-pointer"
          aria-label="Search Now"
        >
          <div className="absolute top-0 left-0 w-[498px] h-[51px] bg-[#d51f25] rounded-[5px]" />

          <div className="bg-[#d51f25] absolute top-0 left-0 w-[165px] h-[51px] border border-solid border-black" />

          <div className="bg-[#d51f25] absolute top-0 left-[165px] w-[167px] h-[51px] border border-solid border-black" />

          <div className="bg-[#d51f25] absolute top-0 left-[332px] w-[165px] h-[51px] border border-solid border-black" />

          <div className="absolute top-px left-[76px] w-[165px] h-[49px] bg-[#d51f25]" />

          <div className="absolute top-px left-[232px] w-[165px] h-[49px] bg-[#d51f25]" />

          <div className="absolute top-1.5 left-[171px] w-[157px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-white text-lg text-center tracking-[0] leading-[44px]">
            Search Now
          </div>
        </button>

        <p className="ml-[85px] w-[338px] h-11 mt-3 [font-family:'Montserrat-Medium',Helvetica] font-normal text-[#dad8d8] text-base text-center tracking-[0] leading-[44px]">
          <span className="font-medium">
            Don&apos;t Know your vehicle ?&nbsp;&nbsp;
          </span>

          <button className="[font-family:'Montserrat-SemiBold',Helvetica] font-semibold cursor-pointer">
            Enter VIN
          </button>
        </p>
      </div>

      <img
        className="absolute top-[876px] left-[394px] w-[652px] h-[88px]"
        alt="Group"
        src={group155}
      />

      <img
        className="absolute top-[1173px] left-[31px] w-[1424px] h-[298px]"
        alt="Group"
        src={group156}
      />

      <img
        className="top-[2017px] w-[1440px] h-[518px] absolute left-0"
        alt="Rectangle"
        src={rectangle34}
      />

      <img
        className="absolute top-[2152px] left-[231px] w-[338px] h-11"
        alt="Ready to find your"
        src={readyToFindYourPart}
      />

      <img
        className="absolute top-[2316px] left-[287px] w-[241px] h-[50px]"
        alt="Group"
        src={group49}
      />

      <img
        className="absolute top-[2017px] left-[748px] w-[579px] h-[518px]"
        alt="Group"
        src={group104}
      />

      <img
        className="absolute top-[2217px] left-[157px] w-[534px] h-[59px]"
        alt="Contact us today for"
        src={
          contactUsTodayForAQuickQuoteOnTheExactPartYouNeedOurTeamIsStandingByToHelp
        }
      />

      <img
        className="absolute top-[2597px] left-[19px] w-[298px] h-11"
        alt="Brands we carry"
        src={brandsWeCarry}
      />

      <img
        className="absolute top-[2625px] left-5 w-[333px] h-11"
        alt="We stock parts for"
        src={weStockPartsForAllMajorAutomotiveBrands}
      />

      <img
        className="absolute top-[2823px] left-0 w-[1440px] h-[839px]"
        alt="Group"
        src={group105}
      />

      <img
        className="absolute top-[3664px] left-0 w-[1440px] h-[361px]"
        alt="Group"
        src={group168}
      />

      <img
        className="absolute top-[1445px] left-[25px] w-[1391px] h-[539px]"
        alt="Group"
        src={group167}
      />

      <div className="absolute top-[2690px] left-5 w-[1410px] h-[100px] flex items-start overflow-hidden">
        <img className="w-[2723px] h-[100px]" alt="Group" src={group184} />
      </div>

      <img
        className="absolute top-[964px] left-[31px] w-[1387px] h-[151px]"
        alt="Frame"
        src={frame109}
      />

      <img
        className="absolute top-[701px] left-[23px] w-[1407px] h-[93px]"
        alt="Group"
        src={group193}
      />

      <a
        href="tel:+1234567890"
        className="absolute top-[866px] left-16 w-[107px] h-[107px] bg-[#000000cf] rounded-[53.5px] shadow-[0px_0px_3px_4px_#ff000085] cursor-pointer"
        aria-label="Call us"
      >
        <img
          className="absolute w-[82.35%] h-[67.65%] top-[17.65%] left-[8.82%]"
          alt="Phone"
          src={phone}
        />
      </a>

      <header className="fixed top-0 left-0 w-[1440px] h-[106px] flex bg-black z-50">
        <div className="mt-[10.1px] w-[180.74px] h-[84.53px] ml-[57.0px] bg-[url(/whatsapp-image-2025-12-11-at-6-58-59-PM-removebg-preview-1.png)] bg-[100%_100%]" />

        <img
          className="mt-6 ml-[10.3px] w-px h-14"
          alt="Vector"
          src={vector11}
        />

        <nav
          className="mt-6 w-[1016px] h-[77px] flex px-0 py-[11px] items-start overflow-hidden"
          aria-label="Car brands navigation"
        >
          <div className="w-[9136px] ml-[11px] flex">
            {carBrands.map((brand, index) => (
              <div
                key={index}
                className={`${brand.width} h-[42px] relative ${index > 0 ? "ml-2" : ""}`}
              >
                <a
                  href={`#${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[11px] whitespace-nowrap"
                >
                  {brand.name}
                </a>

                <div
                  className={`top-0 ${brand.width === "w-[194px]" ? "w-48" : brand.width === "w-[258.55px]" ? "w-[257px]" : "w-[212px]"} h-[42px] rounded-[0px_0px_3px_0px] border border-solid border-[#d51f25] shadow-[0px_0px_4px_2px_#aa191d] absolute left-0`}
                />
              </div>
            ))}
          </div>
        </nav>

        <img className="mt-8 ml-0.5 w-px h-14" alt="Vector" src={vector12} />

        <button
          className="mt-6 w-[70px] h-[70px] ml-9 bg-[url(/menu.png)] bg-[100%_100%] cursor-pointer"
          aria-label="Open menu"
        />
      </header>
    </div>
  );
};
