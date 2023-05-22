import React from "react";

const GoogleMap = ({ extraClass }) => {
  return (
    <div className="">
    <div className={`google-map__${extraClass}`}>
      <iframe
        title="template google map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.6384379897286!2d72.5236259145928!3d23.073713484927165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e833d1e1690f3%3A0xd9259ac03c9ebf7f!2sIQ%20Infinite%20Technologies!5e0!3m2!1sen!2sin!4v1674649041960!5m2!1sen!2sin"
        className={`map__${extraClass}`}
        allowFullScreen
      ></iframe>
    </div>
    </div>
  );
};

export default GoogleMap;
