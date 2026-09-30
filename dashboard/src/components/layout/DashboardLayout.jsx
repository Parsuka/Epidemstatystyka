import Header from './Header';

function DashboardLayout({ title, updatedAt, children }) {
  return (
    <div className="layout">
      <Header title={title} updatedAt={updatedAt} />
      <main className="layout__grid">{children}</main>
    </div>
  );
}

export default DashboardLayout;
