import React from "react";

//styles
import "./Footer.css";
export default function Footer() {
  return (
    <div className="footer">
      <table>
        <thead>
          <tr>
            <th>ABOUT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://www.linkedin.com/in/jakub-gawlik-7b7465248/">
                LinkedIn
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://github.com/Gawc1uuu">GitHub</a>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>All Rights Reserved &copy; | Jakub Gawlik</h2>
    </div>
  );
}
