import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../Components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../Components/ContributeForm';
import Link from 'next/link';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
     };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: "The campaign manager can spend contributions after his spending requests have been approved by a majority of the contributors",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to become an approver'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Blance (ether)',
        description: 'The balance is how much this campaign has left to spend'
      }
    ];

    return <Card.Group items={items} />;
  }



  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                {this.renderCards()}
              </Grid.Column>

              <Grid.Column width={6}>
                <ContributeForm address={this.props.address} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Link href={`/campaigns/${this.props.address}/requests`}>
                  <a>
                    <Button primary>View Requests</Button>
                  </a>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Layout>
      )
  }
}

export default CampaignShow;
