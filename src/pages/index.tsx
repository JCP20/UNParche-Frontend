import React from "react";
import SideMenu from "@/components/SideMenu";
import { Button } from "antd";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <SideMenu>
      <>
        <SearchBar />

        <div
          style={{
            background: "#d7d7d7",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>SideMenu</p>
          <p>SideMenu</p>
          <div className="carta">
            <h2>Hola</h2>
            <p>Esto es una prueba</p>
          </div>
          <Button>Hola</Button>
          {
            // indicates very long content
            Array.from({ length: 100 }, (_, index) => (
              <React.Fragment key={index}>
                {index % 20 === 0 && index ? "more" : "..."}
                <br />
              </React.Fragment>
            ))
          }
        </div>
      </>
    </SideMenu>
  );
}
