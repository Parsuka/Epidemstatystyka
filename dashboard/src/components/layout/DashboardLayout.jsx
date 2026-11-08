import Header from './Header';

function DashboardLayout({ title, updatedAt, isLoading, children }) {
  return (
    <>
      <Header title={title} updatedAt={updatedAt} isLoading={isLoading} />
      <main className="layout__grid">{children}</main>
    </>
  );
}

export default DashboardLayout;
