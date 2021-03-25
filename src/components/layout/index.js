import QinHeader from "../header/qin";
import QinFooter from "../footer/qin";

function Layout({ children }) {
  return (
    <div className="main">
      <QinHeader />
      <div className="">{children}</div>
      <QinFooter />
    </div>
  );
}

export default Layout;
