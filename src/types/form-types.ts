import React from "react";

export type HandleOnChange = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type HandleOnFileChange = React.ChangeEvent<HTMLInputElement>;
