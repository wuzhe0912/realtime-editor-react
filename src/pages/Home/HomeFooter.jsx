import commonStyles from 'common/common.module.css';

function HomeFooter() {
  return (
    <footer className={commonStyles.footerContainer}>
      <h4>
        Built with React by&nbsp;
        <a
          href='https://github.com/wuzhe0912'
          target='_blank'
          rel='noreferrer noopener'
        >
          Pitt Wu
        </a>
      </h4>
    </footer>
  );
}

export default HomeFooter;
