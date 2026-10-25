import Header from './Header';

function DashboardLayout({ title, updatedAt, isLoading, children }) {
  return (
    <div className="layout">
      <Header title={title} updatedAt={updatedAt} isLoading={isLoading} />
      <main className="layout__grid">{children}</main>
    </div>
  );
}

export default DashboardLayout;
