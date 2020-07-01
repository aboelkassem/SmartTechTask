import React from 'react';

class Footer extends React.Component {
    render() {
        return <div>
            <footer class="pt-4">
              <div class="text-center py-3">© {new Date().getFullYear()} Copyright:
                <b> Smart Tech</b>
              </div>
            </footer>
        </div>
    }
}

export default Footer;